from django import forms

class UserForm(forms.Form):
    uid = forms.HiddenInput()
    last_name = forms.CharField(
        label='Lastname',
        max_length=40
    )
    first_name = forms.CharField(
        label='Firstname',
        max_length=40
    )
    middle_name = forms.CharField(
        label='Middlename',
        max_length=40
    )

    def __init__(self, *args, **kwargs):
        super(UserForm, self).__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'form-control'
