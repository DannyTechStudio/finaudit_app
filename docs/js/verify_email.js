document.addEventListener("DOMContentLoaded", async () => {

    const userEmail = document.getElementById("user-email");
    const emailLink = document.querySelector(".email-link");

    const params = new URLSearchParams(window.location.search);
    
    const email = params.get("email");
    const token = params.get("token");

    if (email) {

        userEmail.textContent = email;

        emailLink.href = `mailto:${email}`;

    }

    console.log("Verification page loaded.")
    console.log("Verification token:", token);
    
    if (!token) {
        
        console.error("Verification token is missing.");
        return;
    }
    
    try {
        
        const response = await verifyEmail(token);
        
        console.log("Email verification successful:", response); 
        
        // Redirect to dashboard
        window.location.href = "../../dashboard/dashboard.html";

    } catch (error) {
        
        console.error("Email verification failed:", error);
    }

});
