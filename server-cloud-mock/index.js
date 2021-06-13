const express = require('express');
const admin = require('firebase-admin');
require('dotenv').config();

const app = express();
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert({
    type: 'service_account',
    project_id: 'fireblog-5af7f',
    private_key_id: '8c2a757bdfd7c9340cc6e784cb14db8495456292',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC8omwGI/9qFjB2\nSSi0gQl7ZF+hejGgOitguUuIX4/8Np8e8W8dzO7ldnCrR5dA7fwyG4N4p1MoPm5O\nHZro568rBhkhla55L/sNHloAc6Mn/smt0vhLPThYTPcfMnlIXl0Z7IS/oqyYtcko\nd2F28+iYBfnTdCWeytmrKeKC2I+Y6wtQkOOg5HvjWUFjRLPaT1ewjfXeFX37MaiA\njFDitEdIxYIgdCzSPlGU8hhggMMbJRI84XI3Iquv806RdybfB9BuSkbE5Sv70TG0\nyz5ZcxddVjaKFzJPKEBirNB2GU9wTt77B1tFV6khvYsjFmogfeY4jEbVdhxK63Vn\ngN7++LFLAgMBAAECggEAHuTlF05e/xN6RW0u9v0pPeXPCcXXCdxtDU7bsY6hKNgT\nUICPR8ywFbHDuzGi8pXnl5dM/X4+DtnGvBF6NQn49O1vQUJgDGYQ0nG1oNxPjPXc\nNxVV6BCzQTb9xETCe1lFG0FS7oXoiaxAMVn4AwDoh7l21KxxmuOzKabW+8IXJp6T\nu5fuFKEgUQqGTH3L/zJDq9UYN9lPTCh2FS6ctMkm/f5BsauK8FaBEMLCuPTkhAde\nzJFHTVLwV0hGq4ScNeErwqzQtYGhT+1M9QK7g1AUyJrjN6GeMTRU5z9epdI6Sg3h\nNnTht0OcuQappqzppMzUG2PdRw7x8Phxj0cu5kojxQKBgQD4RvE3sdpCHgW+qDDK\nfwWqFU7Ot+O5iR4Co4Cfomgqd6E2DX0wYr6ac68w0ddmyQ63hMy4U4lZw7/rwX1o\n0RIHf8ccpTmmdj34qZdrC20eLDiz37HsZUsXU4yNG1RwMI4dYDcEf4Zt7GAHiBYQ\nfxqHbscnNRrW3g8DrvdTtW7R9QKBgQDCgInqbsdTfVlYkAZ1yfK77Se05Plw1pa5\nj4PIWlVlTqlOqeKvyF4Qg/iWKXwXybZoXPI0nyFP3cGkz9NlrTB0NMxUM0p6W70P\nOe7fdJ+LfJwyaHPlz9qzgnwUDenfosbFrNe0ZQYexnmO4PQbb1y99WfBq0A8kRfF\nkvqRUnUuPwKBgQDn+NjOUeV8mzKA5gLYYIA5XzlH2fby1pNsobm+7W5oJ2g/6bCL\ncedmxins8lNQ3RBcFb91hc+ySDxcmWeEdLtkuFWghRvtVVMnr8UjJgTpCSZdoedK\n2YWkoNKU0PE+9Y8DEW+2SzSeJhm/T75V4Xw3CCEZl/ugwM/EgEjkNIP7tQKBgCCo\nbH/McfN2zJWuOSd17SfYvh4FhEyJ+2zUyA/P+x6zgoIOzF0vi3vCbO7psEheOh5z\n3McxIOrEFUuTCa+80LHyW4yXwB2jYa84zv7+GfvVxHRCTZN8vv/9HNBRNb+zGST/\nzIghnlF0idyPsO0aWbwbhHxkQLjqs88cyq2z5rEJAoGAECpT3lSHccn0FXzdI1so\nyC+wJWQHPUXK01UvaVKxrpyMcjLrpfN1ZYCx5cBeMnLgWsJxBL0L78Qqcn7puuPf\nlUKcZSTs8t/DUSLh88Wtib2+eFEkl07RRw9n89kvcK7r56YkbiJ3WKaoXoQwXxQz\nVXh9NPqvS8zi9CNTGTGPeUc=\n-----END PRIVATE KEY-----\n',
    client_email:
      'firebase-adminsdk-qau4v@fireblog-5af7f.iam.gserviceaccount.com',
    client_id: '102797594818823974241',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qau4v%40fireblog-5af7f.iam.gserviceaccount.com',
  }),
});

app.post('/', async (req, res) => {
  const email = req.body.email;

  try {
    const user = await admin.auth().getUserByEmail(email);

    await admin.auth().setCustomUserClaims(user.uid, { admin: true });

    res
      .status(200)
      .json({ success: true, msg: `User ${user.email} has been made admin` });
  } catch (error) {
    console.error(error);
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
