# Generated by Django 3.0.2 on 2020-01-20 14:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User_Example',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('drawing_base64', models.TextField()),
                ('label', models.IntegerField(default=0)),
            ],
        ),
    ]