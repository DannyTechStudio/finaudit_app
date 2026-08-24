import resend
from django.conf import settings


def send_verification_email(user, verification_link):
    resend.api_key = settings.RESEND_API_KEY
    
    resend.Emails.send({
        "from": settings.RESEND_FROM_EMAIL,
        "to": [user.email],
        "subject": "Verify Your PurseLens Account",
        "html": f"""

            <h2>Welcome to PurseLens, {user.first_name}!</h2>
            
            <p>
                Thanks for creating your PurseLens account.
            </p>

            <p>
                Please verify your email address by clicking the button below:
            </p>

            <p>
                <a href="{verification_link}"
                   style="
                       display:inline-block;
                       padding:12px 20px;
                       background:#fa8627;
                       color:#292b51;
                       text-decoration:none;
                       font-weight:bold;
                       border-radius:6px;
                    ">
                    Verify Email
                </a>
            </p>
            
            <p>
                This verification link expires in 5 minutes.
            </p>

            <p>
                If you did not create a PurseLens account,
                you can safely ignore this email.
            </p>

            <p>
                — The PurseLens Team
            </p>
                
        """
    })
