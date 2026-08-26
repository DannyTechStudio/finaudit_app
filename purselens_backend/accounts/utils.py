import hashlib
import secrets
from django.utils import timezone
from datetime import timedelta
from django.core.mail import send_mail
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.conf import settings

from .models import EmailVerificationToken
from .services.email_service import send_verification_email as send_verification_email_via_resend


def send_password_reset_email(user, request):
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = PasswordResetTokenGenerator().make_token(user)
    
    # In production, this will be the frontend reset page URL
    reset_link = f"{settings.FRONTEND_URL}/reset-password/?uid={uid}&token={token}"
    
    send_mail(
        subject="FinAudit - Password Reset Request",
        message=f"Hi {user.first_name}, \n\nClick the link below to reset your password:\n{reset_link}\n\nIf you didn't request this, ignore this email.",
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False
    )


def generate_verfication_token(user):
    # Delete existing token if any
    EmailVerificationToken.objects.filter(user=user).delete()
    
    # Generate raw random token
    raw_token = secrets.token_urlsafe(24).rstrip('=')
    
    # Hash token before storing
    hashed_token = hashlib.sha256(raw_token.encode()).hexdigest()
    
    EmailVerificationToken.objects.create(
        user=user,
        token=hashed_token,
        expires_at = timezone.now() + timedelta(minutes=5)
    )
    
    return raw_token


def send_verification_email(user, raw_token):
    verification_link = (
        f"{settings.FRONTEND_URL.rstrip('/')}"
        f"/pages/auth/verify_email.html"
        f"?token={raw_token}"
    )

    send_verification_email_via_resend(
        user=user,
        verification_link=verification_link
    )


def handle_lockout(request, credentials, *args, **kwargs):
    from rest_framework.exceptions import PermissionDenied
    raise PermissionDenied(
        "Your account has been temporarily locked due to too many failed login attempts."
        "Please try again in 30 minutes."
    )

