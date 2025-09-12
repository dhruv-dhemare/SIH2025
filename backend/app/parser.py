
# # parser.py
# import os
# import re
# import json
# import tempfile
# import requests
# from pathlib import Path

# # PDF / DOCX / OCR libs
# import pdfplumber
# import docx2txt
# import fitz  # PyMuPDF
# from PIL import Image

# # optional: paddleocr for scanned PDFs (better layout handling than pytesseract)
# try:
#     from paddleocr import PaddleOCR
#     PADDLE_AVAILABLE = True
#     _paddle_ocr_model = PaddleOCR(use_angle_cls=True, lang="en")
# except Exception:
#     PADDLE_AVAILABLE = False
#     _paddle_ocr_model = None

# # NLP
# import spacy
# nlp = spacy.load("en_core_web_sm")

# # environment config
# from dotenv import load_dotenv
# load_dotenv()
# GEMINI_KEY = os.getenv("GOOGLE_API_KEY")
# # recommended url for Google Generative Language (text generation endpoint)
# GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-1:generateText"

# # Output directories
# UPLOADS_DIR = Path("uploads")
# PARSED_DIR = Path("parsed_resume")
# UPLOADS_DIR.mkdir(exist_ok=True)
# PARSED_DIR.mkdir(exist_ok=True)

# # simple regex helpers
# EMAIL_RE = re.compile(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b")
# PHONE_RE = re.compile(r"\+?\d[\d\s().-]{6,}\d")

# # section detection keywords (case-insensitive)
# SECTION_KEYWORDS = {
#     "education": ["education", "academics", "academics:", "qualifications", "education:"],
#     "experience": ["experience", "work experience", "professional experience", "employment", "work:"],
#     "skills": ["skills", "technical skills", "tech stack", "skills:"],
#     "projects": ["projects", "project", "project experience", "portfolio"],
#     "achievements": ["achievements", "awards", "honors", "certifications"]
# }

# # ---------- TEXT EXTRACTION ----------

# def extract_text_from_docx(path: str) -> str:
#     return docx2txt.process(path) or ""

# def extract_text_from_pdf(path: str) -> str:
#     text_parts = []
#     with pdfplumber.open(path) as pdf:
#         for page in pdf.pages:
#             page_text = page.extract_text() or ""
#             text_parts.append(page_text)
#     text = "\n".join(text_parts)
#     return text

# def ocr_image_via_paddle(image_path: str) -> str:
#     if not PADDLE_AVAILABLE:
#         raise RuntimeError("PaddleOCR not available; install paddleocr and paddlepaddle.")
#     # PaddleOCR returns nested structure; flatten into text
#     res = _paddle_ocr_model.ocr(image_path, cls=True)
#     lines = []
#     for page in res:
#         for line in page:
#             # each line: [bbox, (text, confidence)]
#             text = line[1][0]
#             lines.append(text)
#     return "\n".join(lines)

# def extract_text_from_scanned_pdf(path: str) -> str:
#     # convert each page to image then OCR
#     doc = fitz.open(path)
#     all_text = []
#     for i in range(len(doc)):
#         page = doc[i]
#         # 2x zoom for better OCR
#         mat = fitz.Matrix(2, 2)
#         pix = page.get_pixmap(matrix=mat, alpha=False)
#         with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as tmp:
#             tmp_path = tmp.name
#             pix.save(tmp_path)
#         try:
#             page_text = ocr_image_via_paddle(tmp_path) if PADDLE_AVAILABLE else _ocr_image_via_pytesseract(tmp_path)
#             all_text.append(page_text)
#         finally:
#             try:
#                 os.remove(tmp_path)
#             except Exception:
#                 pass
#     return "\n".join(all_text)

# # fallback with pytesseract if paddle not available
# def _ocr_image_via_pytesseract(image_path: str) -> str:
#     try:
#         import pytesseract
#     except Exception as e:
#         raise RuntimeError("pytesseract not installed and paddleocr unavailable.") from e
#     text = pytesseract.image_to_string(Image.open(image_path))
#     return text

# def extract_text_auto(path: str) -> (str, bool):
#     """
#     returns tuple: (text, scanned_bool)
#     scanned_bool=True if we used OCR path.
#     Heuristic: if pdfplumber extracts very little text, assume scanned and run OCR.
#     """
#     ext = Path(path).suffix.lower()
#     if ext == ".docx":
#         return extract_text_from_docx(path), False
#     if ext in [".txt", ".md"]:
#         with open(path, "r", encoding="utf-8", errors="ignore") as f:
#             return f.read(), False
#     if ext == ".pdf":
#         text = extract_text_from_pdf(path)
#         # simple heuristic: if text length very small -> scanned
#         if len(text.strip()) < 200 and PADDLE_AVAILABLE:
#             # fallback to OCR
#             ocr_text = extract_text_from_scanned_pdf(path)
#             return ocr_text, True
#         return text, False
#     # other types: try reading as text
#     with open(path, "r", encoding="utf-8", errors="ignore") as f:
#         return f.read(), False

# # ---------- RULES & SPACY EXTRACTION ----------

# def find_emails(text: str):
#     return list({m.group(0) for m in EMAIL_RE.finditer(text)})

# def find_phones(text: str):
#     # postprocess to keep normalized forms
#     phones = list({m.group(0).strip() for m in PHONE_RE.finditer(text)})
#     return phones

# def basic_spacy_entities(text: str):
#     doc = nlp(text)
#     persons = [ent.text for ent in doc.ents if ent.label_ == "PERSON"]
#     orgs = [ent.text for ent in doc.ents if ent.label_ == "ORG"]
#     gpes = [ent.text for ent in doc.ents if ent.label_ == "GPE"]
#     dates = [ent.text for ent in doc.ents if ent.label_ == "DATE"]
#     return {"persons": persons, "orgs": orgs, "gpes": gpes, "dates": dates}

# def split_into_sections(text: str) -> dict:
#     """
#     Heuristic splitting of resume into sections by scanning for headings/keywords.
#     If a heading isn't found, the top of the doc is personal_info.
#     """
#     sections = {k: "" for k in SECTION_KEYWORDS.keys()}
#     sections["personal_info"] = ""
#     current = "personal_info"
#     lines = [line.rstrip() for line in text.splitlines()]
#     for line in lines:
#         low = line.lower().strip()
#         if not low:
#             # keep blank lines as separators but don't change current
#             continue
#         switched = False
#         for sec, keys in SECTION_KEYWORDS.items():
#             for kw in keys:
#                 # check whole-word presence
#                 if kw in low and len(low) < 40:
#                     current = sec
#                     switched = True
#                     break
#             if switched:
#                 break
#         sections[current] += line + "\n"
#     return sections

# # ---------- Gemini (Generative) Enhancement ----------

# def call_gemini_extract(section_name: str, section_text: str) -> dict:
#     """
#     Call Generative Language API asking for strict JSON for the section.
#     The function is conservative and parses JSON if returned as text.
#     Returns a dict (parsed JSON or {"error": ...}).
#     """
#     if not GEMINI_KEY:
#         return {"error": "No Gemini key configured"}

#     # craft a concise prompt that insists on outputting JSON only
#     prompt = (
#         f"You are a JSON extractor specialized for resumes. "
#         f"Extract the {section_name} section from the following text and return only valid JSON. "
#         f"For {section_name}, return structured fields appropriate to that section (e.g., for education return list of "
#         f"{{'institution','degree','start_year','end_year','grade'}} entries). If there is no information, return an empty list or object. "
#         f"Do NOT add commentary. Text:\n\n{section_text}\n\nReturn JSON only."
#     )

#     payload = {
#         "prompt": prompt,
#         "temperature": 0,
#         "maxOutputTokens": 800
#     }
#     headers = {"Authorization": f"Bearer {GEMINI_KEY}", "Content-Type": "application/json"}
#     try:
#         resp = requests.post(GEMINI_URL, headers=headers, json=payload, timeout=20)
#         resp.raise_for_status()
#         d = resp.json()
#         # two common shapes: older libs return 'candidates' list with 'content' or new 'output' fields
#         text_out = None
#         # try multiple places safely
#         if isinstance(d, dict):
#             # text-bison style: 'candidates' -> first -> 'content' or 'output' keys
#             if "candidates" in d and isinstance(d["candidates"], list) and d["candidates"]:
#                 cand = d["candidates"][0]
#                 text_out = cand.get("content") or cand.get("output")
#             elif "output" in d and isinstance(d["output"], dict):
#                 # some responses use output_text or output[0].content
#                 text_out = d["output"].get("text") or d["output"].get("output_text")
#             elif "output_text" in d:
#                 text_out = d["output_text"]
#             else:
#                 # fallback: stringify
#                 text_out = json.dumps(d)
#         else:
#             text_out = str(d)

#         # try parse JSON safely
#         if not text_out:
#             return {"error": "Empty response from Gemini"}
#         # Some models return plain JSON; others return text with backticks — sanitize
#         cleaned = text_out.strip()
#         # remove leading/trailing markdown fences
#         if cleaned.startswith("```"):
#             cleaned = "\n".join(cleaned.splitlines()[1:-1]).strip()
#         # try parse
#         try:
#             parsed = json.loads(cleaned)
#             return parsed
#         except Exception:
#             # do a relaxed attempt: look for first "{" ... "}" block
#             m = re.search(r"(\{[\s\S]*\})", cleaned)
#             if m:
#                 try:
#                     return json.loads(m.group(1))
#                 except Exception:
#                     pass
#             # try to evaluate list
#             m2 = re.search(r"(\[[\s\S]*\])", cleaned)
#             if m2:
#                 try:
#                     return json.loads(m2.group(1))
#                 except Exception:
#                     pass
#             # last fallback: return raw as text
#             return {"raw": cleaned}
#     except requests.RequestException as e:
#         return {"error": f"gemini_request_failed: {str(e)}"}
#     except Exception as e:
#         return {"error": f"gemini_unknown_error: {str(e)}"}

# # ---------- HIGH-LEVEL PARSER ----------

# def needs_gemini(parsed_by_spacy: dict) -> bool:
#     """
#     Decide whether to call Gemini for enhancement.
#     Heuristics: if no education, no experience, and no skills detected, use Gemini.
#     """
#     empty_edu = not parsed_by_spacy.get("education")
#     empty_exp = not parsed_by_spacy.get("experience")
#     empty_skills = not parsed_by_spacy.get("skills")
#     # if all three empty, good candidate for Gemini
#     return empty_edu and empty_exp and empty_skills

# def parse_resume(file_path: str, email_for_save: str = None) -> dict:
#     """
#     Main function to be called by the FastAPI route.
#     file_path: path to saved file
#     email_for_save: optional string to name parsed json
#     """
#     text, scanned_used = extract_text_auto(file_path)
#     sections = split_into_sections(text)
#     emails = find_emails(text)
#     phones = find_phones(text)
#     ents = basic_spacy_entities(text)

#     # Basic structure from spaCy+rules
#     parsed = {
#         "personal_info": {
#             "name": ents["persons"][0] if ents["persons"] else "",
#             "emails": emails,
#             "phones": phones,
#             "locations": list(dict.fromkeys(ents["gpes"])),
#             "organizations": list(dict.fromkeys(ents["orgs"]))
#         },
#         "education": [],
#         "experience": [],
#         "skills": [],
#         "projects": [],
#         "achievements": [],
#         "raw_text": text,
#         "scanned": scanned_used,
#         "gemini_used": False,
#         "gemini_errors": []
#     }

#     # rudimentary parse of sections using heuristics:
#     def simple_list_lines(s: str):
#         return [l.strip("•- \t") for l in s.splitlines() if l.strip()]

#     # extract skills heuristic (comma / bullets / 'Web Development:' lines)
#     skills_text = sections.get("skills", "")
#     if skills_text:
#         # split on commas or bullets or colon lines
#         lines = simple_list_lines(skills_text)
#         skills = []
#         for line in lines:
#             if ":" in line:
#                 _, after = line.split(":", 1)
#                 parts = re.split(r"[,\|;/]+", after)
#                 skills.extend([p.strip() for p in parts if p.strip()])
#             else:
#                 parts = re.split(r"[,\|;/]+", line)
#                 skills.extend([p.strip() for p in parts if p.strip()])
#         parsed["skills"] = list(dict.fromkeys(skills))

#     # education & experience basics: keep lines under those sections
#     parsed["education"] = simple_list_lines(sections.get("education", ""))
#     parsed["experience"] = simple_list_lines(sections.get("experience", ""))
#     parsed["projects"] = simple_list_lines(sections.get("projects", ""))
#     parsed["achievements"] = simple_list_lines(sections.get("achievements", ""))

#     # if heuristics indicate missing important sections, call Gemini per section
#     if needs_gemini(parsed):
#         # only call gemini for the full raw_text, or per-section if available
#         parsed["gemini_used"] = True
#         # call gemini for each major section to build structured JSON
#         for sec in ["education", "experience", "skills", "projects", "achievements"]:
#             sec_text = sections.get(sec, "").strip() or text  # try section text, else whole text
#             gem = call_gemini_extract(sec, sec_text)
#             if "error" in gem:
#                 parsed["gemini_errors"].append({sec: gem["error"]})
#             else:
#                 # try to normalize results into lists where appropriate
#                 if isinstance(gem, list):
#                     parsed[sec] = gem
#                 elif isinstance(gem, dict):
#                     # if dict contains key matching sec, use it
#                     if sec in gem and isinstance(gem[sec], (list, dict)):
#                         parsed[sec] = gem[sec]
#                     else:
#                         # otherwise if dict looks like entries, put it into list
#                         parsed[sec] = [gem]
#                 else:
#                     # unknown result, store raw
#                     parsed[sec] = [gem]

#     # save parsed JSON when email_for_save provided
#     if email_for_save:
#         safe_name = email_for_save.replace("@", "_at_").replace(".", "_")
#         out_path = PARSED_DIR / f"{safe_name}.json"
#         with open(out_path, "w", encoding="utf-8") as f:
#             json.dump(parsed, f, indent=2, ensure_ascii=False)

#     return parsed

import re
import spacy

nlp = spacy.load("en_core_web_sm")

# ---------------------------
# Helpers
# ---------------------------
def normalize_list(values):
    seen, cleaned = set(), []
    for v in values:
        val = v.strip()
        if not val or val.lower() in seen:
            continue
        seen.add(val.lower())
        cleaned.append(val)
    return cleaned

def detect_sections(text: str):
    """
    Dynamically detect section headers by capitalization + line breaks.
    Example: "EDUCATION", "Projects", "Achievements"
    """
    headers = []
    for line in text.splitlines():
        if line.strip() and (line.isupper() or re.match(r'^[A-Z][A-Za-z ]{2,}$', line.strip())):
            headers.append(line.strip())
    return normalize_list(headers)

def extract_section(text: str, section_headers: list, header: str):
    """
    Extract text between 'header' and the next available header from section_headers.
    """
    idx = text.lower().find(header.lower())
    if idx == -1:
        return None
    after = text[idx:]
    # find next header
    next_indices = [after.lower().find(h.lower()) for h in section_headers if after.lower().find(h.lower()) > 0]
    end = min(next_indices) if next_indices else len(after)
    section_text = after[len(header):end].strip()
    return section_text if section_text else None

def split_bullets(section_text: str):
    if not section_text:
        return None
    bullets = re.split(r"[\n•\-•]", section_text)
    return normalize_list([b.strip() for b in bullets if b.strip()])

# ---------------------------
# Main parser
# ---------------------------
def parse_resume(text: str):
    doc = nlp(text)

    # ---------- Personal Info ----------
    emails = normalize_list([ent.text for ent in doc.ents if ent.label_ == "EMAIL"])
    phones = normalize_list(re.findall(r'(\+?\d[\d\s\-\(\)]{8,}\d)', text))
    names = normalize_list([ent.text for ent in doc.ents if ent.label_ == "PERSON"])
    locations = normalize_list([ent.text for ent in doc.ents if ent.label_ in ["GPE", "LOC"]])
    orgs = normalize_list([ent.text for ent in doc.ents if ent.label_ == "ORG"])

    # ---------- Section Detection ----------
    section_headers = detect_sections(text)

    education = None
    experience = None
    skills = None
    projects = None
    achievements = None
    extracurricular = None

    for header in section_headers:
        section_text = extract_section(text, section_headers, header)
        if not section_text:
            continue
        if "educat" in header.lower():
            education = split_bullets(section_text)
        elif "experience" in header.lower() or "work" in header.lower():
            experience = split_bullets(section_text)
        elif "skill" in header.lower() or "tech" in header.lower():
            skills = split_bullets(section_text)
        elif "project" in header.lower():
            projects = split_bullets(section_text)
        elif "achieve" in header.lower() or "award" in header.lower():
            achievements = split_bullets(section_text)
        elif "extra" in header.lower() or "activity" in header.lower():
            extracurricular = split_bullets(section_text)

    return {
        "personal_info": {
            "name": names[0] if names else None,
            "emails": emails if emails else None,
            "phones": phones if phones else None,
            "locations": locations if locations else None,
            "organizations": orgs if orgs else None,
        },
        "education": education,
        "experience": experience,
        "skills": skills,
        "projects": projects,
        "achievements": achievements,
        "extracurricular": extracurricular,
        "raw_text": text
    }
