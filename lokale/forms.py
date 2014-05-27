from django import forms
from django.contrib.auth.models import User  #tutaj dac klient i firma jakos
from django.contrib.auth.forms import UserCreationForm
from lokale.models import Klient

class ClientRegistrationForm(UserCreationForm):
    email = forms.EmailField(required=True)
    
    class Meta:
        model = Klient
        fields = ('nick','haslo','email')

    def save(self, commit=True):
        user = super(ClientRegistrationForm, self).save(commit=False)
        user.email = self.cleaned_data['email']

        if commit:
            user.save()

        return user

    # tutaj jest form klienta, niby dziala, narazie brzydko, ale jakos nie dodaje do bazy tego klienta.