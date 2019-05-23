from django.shortcuts import get_object_or_404, render, render_to_response
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.core import serializers
from .models import Users

def index(request):
    return render(request, 'crud/users.html')

def saveUsers(request):

    if request.method == 'POST':

        # process the data in request.POST as required
        uid = request.POST['uid']
        last_name = request.POST['last_name']
        first_name = request.POST['first_name']
        middle_name = request.POST['middle_name']

        if uid:
            # update data in database
            Users.objects.filter(id=uid).update(
                last_name = last_name,
                first_name = first_name,
                middle_name = middle_name
            )
        else:
            # save data to database
            Users.objects.create(
                last_name = last_name,
                first_name = first_name,
                middle_name = middle_name
            )

    return getUsers(request)

def getUsers(request):
    users = Users.objects.all()
    users = serializers.serialize('json', users)
    return HttpResponse(users, content_type='application/json')

def deleteUsers(request):
    if request.method == 'POST':
        uid = request.POST['uid']
        Users.objects.get(pk=uid).delete()

    return getUsers(request)
