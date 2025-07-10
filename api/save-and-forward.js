export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end("Method Not Allowed");

  const { name, email, subject, message } = req.body;

  const googleScriptURL = "https://script.google.com/macros/s/AKfycbwU3iB9o-Z0gOtCvQEaxvWUUxwnabuDCmxSC5OlbAyW4A1nIusI3RZugByLRoe9KUq2nQ/exec"; // Replace with your script URL

  try {
    // 1. Save to Google Sheets
    await fetch(googleScriptURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({ name, email, subject, message })
    });

    // 2. Redirect to thank-you page
    return res.redirect(302, '/thankyou.html');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Submission failed" });
  }
}
