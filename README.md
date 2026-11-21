# Bharat Project Connect – Upgraded Website

This package contains a responsive multi-page website and a Google Sheets + Apps Script enquiry backend.

## Website files
- `index.html` – home page
- `about.html`, `contact.html`, `enquiry.html`
- `services/` – one page for each service vertical
- `style.css`, `script.js`
- `google-apps-script/Code.gs` and `Admin.html` – enquiry storage and private admin dashboard

## Important before publishing
1. The website contact number is set to **+91 7302614061**.
2. Email is set to **bharatconnect7731@gmail.com**.
3. The enquiry form will not store submissions until the Google Apps Script backend is deployed and its URL is pasted into `script.js`.
4. Admin dashboard password must be changed in `Code.gs` before deployment.

## Upload website to your existing GitHub repository
1. Download and extract this ZIP on your computer.
2. Open your existing GitHub repository `bharat-project-connect`.
3. Use **Add file → Upload files**.
4. Upload all contents inside the extracted folder (not the outer folder itself), including `index.html`, `style.css`, `script.js`, `about.html`, `contact.html`, `enquiry.html`, `services` folder and `google-apps-script` folder.
5. If GitHub asks to replace existing files, confirm. Commit changes to `main`.
6. Open your GitHub Pages website and hard refresh with `Ctrl + Shift + R`.

## Activate free enquiry storage + admin dashboard
### A. Create the Google Sheet
1. Open https://sheets.google.com and create a blank spreadsheet named `BPC Enquiries`.
2. In the sheet, open **Extensions → Apps Script**.
3. Delete the sample code in `Code.gs` and paste the complete contents of `google-apps-script/Code.gs`.
4. In the code, change `CHANGE-THIS-TO-A-STRONG-PASSWORD` to a unique password. Do not share this password.
5. In Apps Script, click **+** beside Files → HTML. Name it exactly `Admin` and paste the contents of `google-apps-script/Admin.html`.
6. Click Save.

### B. Deploy Apps Script
1. Click **Deploy → New deployment**.
2. Select the gear icon / type and choose **Web app**.
3. Set **Execute as: Me**.
4. Set **Who has access: Anyone** (the public form needs to submit enquiries; the admin dashboard itself still asks for the password).
5. Click Deploy and approve the Google permissions.
6. Copy the Web app URL ending in `/exec`.

### C. Connect website form
1. Open `script.js` in your GitHub repository and click Edit.
2. Find `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE`.
3. Replace the placeholder inside the quotes with your copied `/exec` URL.
4. Commit changes.
5. Submit a test enquiry from your live website. Check the `Enquiries` tab in your Google Sheet.

### D. Open the private admin dashboard
Open your Apps Script web app URL and add `?admin=1` at the end, for example:
`https://script.google.com/macros/s/XXXXX/exec?admin=1`
Sign in using the password you set in `Code.gs`. You can search enquiries, refresh the list and change statuses to New, Contacted, In Progress, Converted or Closed.

## Security and practical notes
- Keep the dashboard URL and password private. Use a strong, unique password.
- Anyone can submit the public enquiry form; do not collect highly sensitive personal documents through this basic form.
- The Apps Script web app is deployed as "Anyone" so the public site can send enquiries. The admin functions require the configured password.
- If you edit the Apps Script after deployment, use **Deploy → Manage deployments → Edit → New version → Deploy** to publish the changes.
- This package is a starter system. Test it with a sample enquiry before sharing widely.
