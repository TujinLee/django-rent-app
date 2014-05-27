# Create your views here.
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.contrib import auth
from django.core.context_processors import csrf
from django.template.loader import get_template
from django.template import Context
from lokale.forms import ClientRegistrationForm
from lokale.models import *
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime
from datetime import timedelta
from datetime import date
from django.db.models import Q

def home(request):
    all_entries = list(Miejsce.objects.all()[:5])
    return HttpResponse(render_to_response(
                                        'index.html',{'page':'main_page.html','user':request.user, 'car_entry':all_entries},
                                        ))
def place_view(request):
    if request.method == 'POST':
        request.session['sel_car'] = request.POST.get('id_car','brak');
        return HttpResponseRedirect('/place_reserve')

    all_entries = list(Miejsce.objects.all())
    c = {'page':'place_view.html','user':request.user, 'car_entry':all_entries}
    c.update(csrf(request))
    return HttpResponse(render_to_response('index.html',c))

def place_reserve(request):  #sprawdzac czy juz nie wypozyczylismy samochodu
    if request.method== 'POST':
        req_user = request.user.username
        dayss = request.POST.get('days','')
        sel_id = request.session['sel_car']
        sel_car = Miejsce.objects.get(id=sel_id)
        sel_car.save()
        return HttpResponseRedirect('/place_reserve_success/')

    sel_id = request.session['sel_car']
    sel_car = Miejsce.objects.get(id=sel_id)
    c = {'page':'place_reserve.html','user':request.user, 'o':sel_car}
    c.update(csrf(request))
    return HttpResponse(render_to_response('index.html',c))

def place_reserve_success(request):
    sel_id = request.session['sel_car']
    sel_car = Miejsce.objects.get(id=sel_id)
    return HttpResponse(render_to_response(
                                            'index.html',{'page':'place_reserve_success.html','user':request.user, 'o':sel_car},
                                           ))

def place_reserve_fail(request):
       return HttpResponse(render_to_response(
                                            'index.html',{'page':'place_reserve_fail.html','user':request.user},
                                           ))


def login(request):
    c = {'page':'login.html', 'user':request.user}
    c.update(csrf(request))
    return HttpResponse(render_to_response('index.html',c))

def auth_view(request):
    username = request.POST.get('username','')
    password = request.POST.get('password','')
    user = auth.authenticate(username=username, password=password)
    if user is not None:
        auth.login(request, user)
        return HttpResponseRedirect('/login_me')
    else:
        return HttpResponseRedirect('/invalid')

def login_user(request):
    return HttpResponse(render_to_response('index.html',
                              {'page':'main_page.html','user': request.user}))

def logout_user(request):
    auth.logout(request)
    return render_to_response('index.html',{'page':'main_page.html','user':request.user})

def invalid_login(request):
    return render_to_response('index.html',{'page':'invalid.html','user':request.user})


def register(request):
    if request.method == 'POST':  
        loginp = request.POST.get('login','')
        haslop = request.POST.get('haslo','')
        mailp = request.POST.get('email','')         
        klient = Klient(nick = loginp, haslo = haslop, email = mailp)
        klient.save()
        user = User(username = loginp)
        user.set_password(haslop)
        user.save()
        return HttpResponseRedirect('/register_success')

    c = {'page': 'register.html', 'user': request.user}
    c.update(csrf(request))

    return render_to_response('index.html',c) 
                                                    # return render_to_response('register.html',args)
                                                    # tylko nie wiem czy jest rejestracja w naszych wybranych przypadkach ;d
                                                    # poprawic tutaj jeszcze, bo jest standardowy form
                                                    # http://www.youtube.com/watch?v=xaPHSlTmg1s

def register_success(request):
    return render_to_response('index.html',{'page':'register_success.html','user':request.user})
