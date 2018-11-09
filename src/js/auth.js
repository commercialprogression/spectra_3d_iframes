// Import our stuffs.
import GoTrue from "gotrue-js";

// Setup the auth object.
const auth = new GoTrue({
  APIUrl: "https://dentsplyprosthetics-clinician.netlify.com/.netlify/identity"
});

// Attempt to grab user.
const user = auth.currentUser();

// Netlify CMS.
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", (user) => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/";
      });
    }
  });
}

// Export some things.
export {user, auth};
