from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',url(r'^$', 'lokale.views.home', name='home'),
                       url(r'^register/','lokale.views.register'), 
                       url(r'^register_success/','lokale.views.register_success'),
                       url(r'^add_place/','lokale.views.add_place'),
                       url(r'^view_profile/','lokale.views.view_profile'),
                       url(r'^accept_offer/','lokale.views.accept_offer'),
                       url(r'^decline_offer/','lokale.views.decline_offer'),
                       url(r'^place_view/', 'lokale.views.place_view'), 
                       url(r'^main/', 'lokale.views.home'),
                       url(r'^place_reserve/','lokale.views.place_reserve'),
                       url(r'^login/','lokale.views.login'),
                       url(r'^auth/$', 'lokale.views.auth_view'),
                       url(r'^login_me/$', 'lokale.views.login_user'),
                       url(r'^logout_me/$', 'lokale.views.logout_user'),
                       url(r'^invalid/$', 'lokale.views.invalid_login'),
                       url(r'^place_reserve_success/$', 'lokale.views.place_reserve_success'),
                       url(r'^place_reserve_fail/$', 'lokale.views.place_reserve_fail'),
    # Examples:
    # url(r'^$', 'Wypozyczalnia.views.home', name='home'),
    # url(r'^Wypozyczalnia/', include('Wypozyczalnia.Wypozyczalnia.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)
