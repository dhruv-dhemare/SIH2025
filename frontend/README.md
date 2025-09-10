# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


Dataset → Alumni Name + Pincode
Convert Pincode → Lat/Lng (using geocoding once)
Save Pre-Geocoded Dataset (Name, Lat, Lng)
Plot instantly on map (dots + clustering/heatmap)


npm init -y
npm install node-fetch@2
node geocode_pincodes.js


Dots/Cluster layer (using Leaflet + MarkerCluster plugin)
Heatmap layer (using Leaflet.heat plugin)
Toggle button to switch between them

cd frontend
npm install leaflet react-leaflet

cd backend
node server.js

cd frontend
npm run dev

go live!!


