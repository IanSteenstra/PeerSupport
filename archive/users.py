#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 24 16:11:46 2020

@author: stone
"""

from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class User(AbstractBaseUser, PermissionsMixin):
    USER_TYPES = (
       ("Student", "Student"),
       ("volunteer", "volunteer"),
       ("Counseler", "Couseler")
    )
    username = models.CharField(max_length=100, unique=True)
    first_name = models.CharField(_("first name"), max_length=30, blank=True, null=True)
    last_name = models.CharField(_("last name"), max_length=30, blank=True, null=True)
    email = models.EmailField(_("email address"), unique=True)
    access_user_data = models.BooleanField(_("staff status"), default=False)
    is_active = models.BooleanField(_("active status"), default=True)
    user_type = models.CharField(choices=USER_TYPES)
    
    