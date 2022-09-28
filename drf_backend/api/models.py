from django.db import models

# Create your models here.

class Todo(models.Model):
    id = models.IntegerField(primary_key=True,unique=True)
    tasks = models.CharField(max_length=200, null=False, blank=False)
    completed = models.BooleanField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.tasks