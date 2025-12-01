from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear all data
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()
        Workout.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create users
        tony = User.objects.create(name='Tony Stark', email='tony@marvel.com', team=marvel)
        steve = User.objects.create(name='Steve Rogers', email='steve@marvel.com', team=marvel)
        bruce = User.objects.create(name='Bruce Wayne', email='bruce@dc.com', team=dc)
        clark = User.objects.create(name='Clark Kent', email='clark@dc.com', team=dc)

        # Create workouts
        w1 = Workout.objects.create(name='Super Strength', description='Heavy lifting and power moves', suggested_for='Marvel')
        w2 = Workout.objects.create(name='Flight Training', description='Aerobic and flight simulation', suggested_for='DC')

        # Create activities
        Activity.objects.create(user=tony, type='Iron Suit Training', duration=60, date=timezone.now())
        Activity.objects.create(user=steve, type='Shield Throw', duration=45, date=timezone.now())
        Activity.objects.create(user=bruce, type='Martial Arts', duration=50, date=timezone.now())
        Activity.objects.create(user=clark, type='Flying', duration=70, date=timezone.now())

        # Create leaderboard
        Leaderboard.objects.create(team=marvel, points=200)
        Leaderboard.objects.create(team=dc, points=180)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data!'))
