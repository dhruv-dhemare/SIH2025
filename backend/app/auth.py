# # auth.py
# from fastapi import APIRouter, Form, UploadFile, File, HTTPException
# from fastapi.responses import JSONResponse
# import shutil, os, json
# from pathlib import Path
# from parser import parse_resume, UPLOADS_DIR

# router = APIRouter()
# UPLOADS_DIR.mkdir(exist_ok=True)

# USERS_FILE = Path("users.json")

# def save_user_record(email: str, password_hash: str, parsed_resume: dict):
#     users = []
#     if USERS_FILE.exists():
#         with open(USERS_FILE, "r", encoding="utf-8") as f:
#             try:
#                 users = json.load(f)
#             except Exception:
#                 users = []
#     users.append({"email": email, "password": password_hash, "resume_data_file": f"parsed_resume/{email.replace('@','_at_').replace('.','_')}.json"})
#     with open(USERS_FILE, "w", encoding="utf-8") as f:
#         json.dump(users, f, indent=2)
#     # save resume JSON (parse_resume already saves if email_for_save provided)
#     return

# @router.post("/register")
# async def register(email: str = Form(...), password: str = Form(...), resume: UploadFile = File(None)):
#     """
#     Register a new user. If resume file provided, parse and save JSON.
#     """
#     if not email or not password:
#         raise HTTPException(status_code=400, detail="email and password required")

#     # basic password hashing (sha256) - replace with proper hashing in production
#     import hashlib
#     password_hash = hashlib.sha256(password.encode()).hexdigest()

#     parsed = {}
#     if resume:
#         # save file to uploads and parse
#         filename = Path(resume.filename).name
#         save_path = UPLOADS_DIR / filename
#         with open(save_path, "wb") as out:
#             shutil.copyfileobj(resume.file, out)
#         # parse and save parsed JSON using email as filename
#         parsed = parse_resume(str(save_path), email_for_save=email)
#     else:
#         parsed = {"note": "no_resume_uploaded"}

#     # save user record (for now in users.json)
#     save_user_record(email, password_hash, parsed)
#     return JSONResponse({"status": "ok", "email": email, "resume_parsed": parsed})

from fastapi import APIRouter, UploadFile, File
import os
from parser import parse_resume, UPLOADS_DIR

router = APIRouter()

@router.post("/parse-resume")
async def parse_resume_endpoint(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOADS_DIR, file.filename)
    with open(file_path, "wb") as f:
        f.write(await file.read())

    result = parse_resume(file_path)
    return result
