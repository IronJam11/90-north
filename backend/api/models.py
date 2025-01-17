from typing import Any
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import UserManager,AbstractBaseUser,PermissionsMixin
from passlib.hash import pbkdf2_sha256
class CustomUserManager(UserManager):
    def _create_user(self,email,password,enrollmentNo,**extra_fields):
        if not email:
            return ValueError("If have not provided a valid email ID!")
        email = self.normalize_email(email)
        user = self.model(email=email,enrollmentNo= enrollmentNo,**extra_fields)
        user.set_password(password)
        user.save(using = self._db)
        return user
    def create_user(self,email=None,password=None,enrollmentNo = None,**extra_fields):
        extra_fields.setdefault('is_reviewee',True)
        extra_fields.setdefault('is_admin',False)
        extra_fields.setdefault('is_reviewer',False)
        return self._create_user(email=email,password=password,enrollmentNo = enrollmentNo,**extra_fields)
    
    def create_superuser(self,email=None,password=None,enrollmentNo=None,**extra_fields):
        extra_fields.setdefault('is_reviewee',True)
        extra_fields.setdefault('is_admin',True)
        extra_fields.setdefault('is_reviewer',True)
        return self._create_user(email=email,password=password,enrollmentNo = enrollmentNo,**extra_fields)
    

class User(AbstractBaseUser,PermissionsMixin):
    email = models.EmailField(unique = True,default='')
    name = models.CharField(max_length=100,default='User')
    username = models.CharField(max_length=100,unique=True)
    bio = models.TextField(blank=True,max_length=500)
    profile_picture = models.ImageField(upload_to='profile_pictures/',null=True,blank=True)
    date_joined = models.DateTimeField(default=timezone.now)
    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['username',"name"]
    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
    
    def get_full_name(self):
        return self.name


