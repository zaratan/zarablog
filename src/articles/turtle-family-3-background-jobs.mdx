---
type: post
title: "Turtle family 3 Background Jobs"
date: 2018-03-16T14:26:00
comments: true
categories: 
  - THP
  - code
  - background-jobs
  - scratch
---
On ajoute a nos tortues la possibilité d'agir en dehors des requêtes HTTP en envoyant des emails

<!-- more -->

{{< youtube PyBGd82GJks >}}

Voilà le code produit à la fin de la vidéo: https://github.com/denispasin/turtle_family/tree/end_session_3

Security: Tous les tokens ont été changé ;)

Dans cette vidéo on ajoute des background jobs et de l'envoi d'email.

À la fin de la vidéo on a:

* Une capacité a ajouté des processus asynchrones
* Un envoi d'email async.
* Vu les callbacks dans les modèles de rails
* Ajouté du versionning d'API.

Tout cela est globalement testé.

Le maitre mot ici est: L'utilisateur ne devrait pas attendre pour des choses qui peuvent se passer en dehors de son temps.

## Les outils qu'on a utilisé:

* Les [callbacks](http://guides.rubyonrails.org/active_record_callbacks.html) de rails. Qui permettent d'effectuer des actions à certains moments du cycle de vie d'un modèle.
* [ActionMailer](http://guides.rubyonrails.org/action_mailer_basics.html). Comment envoyer des emails facilement avec rails. On reviendra surement là dessus dans une prochaine vidéo.
* [Sidekiq](https://github.com/mperham/sidekiq) et [ActiveJob](http://edgeguides.rubyonrails.org/active_job_basics.html). Pour processer des actions en tache de fond
* [Redis](https://redis.io/). Une base de donnée avec des queues. On en reparlera plus dans une vidéo ulterieure. Retenez juste que Sidekiq s'appuie dessus.
* [Mailtrap](https://mailtrap.io/) pour les emails en development.
* [Sendgrid](https://sendgrid.com/) pour envoyer des emails.
* [Figaro](https://github.com/laserlemon/figaro) pour manipuler des variables d'env en dev.

## Les callbacks

Dans les modèles en Rails on a a chaque action une suite d'étapes. Par exemple lors de la création d'une nouvelle instance de modèle:

* validation: on valide que le modèle vérifie toutes les validations associées;
* save/create: on sauve/crée l'objet en database;
* commit: on sort de la transaction SQL et notre objet est disponible pour les autres threads.

On peut ajouter des actions automatiques avant/après/autour de chacune de ces phases.

Par exemple si on veut quelque chose qui s'exécute après chaque create:
```ruby
class MonModele < ApplicationRecord
  after_create :do_smthg

  private

  def do_smthg
    …
  end
end
```

On peut ajouter des conditions sur l'exécution. Par exemple dans turtle-app on voulait envoyer un email si et seulement si la tortue avait un email.

```ruby
after_create :send_email_to_creator, if: -> { email }
```

La syntaxe en `-> {}` est un [lambda](http://www.culttt.com/2015/05/13/what-are-lambdas-in-ruby/) qui se comporte comme une fonction anonyme en JS ~ish.

## ActionMailer

Je vais pas trop développer ActionMailer ici mais dans l'idée c'est un type d'objet pour envoyer des mails en rails.

On en génère un nouveau en faisant:
```bash
rails g mailer turtle create
```
qui va créer un nouveau TurtleMailer avec un mail de type create.

La classe d'un mailer ressemble à ça:

{{< filename "app/mailers/turtle_mailer.rb" >}}
```ruby app/mailers/turtle_mailer.rb
class TurtleMailer < ApplicationMailer
  def create(turtle)
    @turtle_name = turtle.name

    mail to: turtle.email
  end
end
```

et s'appuie sur des views (un peu comme un front classique en rails):
```html
<h1>Turtle#create</h1>

<p>
  I'm a new turtle <%= @turtle_name %>
</p>
```

Pour envoyer des mails quelque part on fait:
```ruby
TurtleMailer.create(self).deliver_now
```

## Mailtrap
C'est un outil très pratique pour envoyer des emails "pour de vrai" et tous les recevoir dans la même boite mail. On peut créer son compte directement sur le site ou l'ajouter a une de nos app heroku.

Ensuite on configure son fichier d'environnement de dev pour l'utiliser:

{{< filename "config/environnements/development.rb" >}}
```ruby config/environments/development.rb
config.action_mailer.delivery_method = :smtp
config.action_mailer.smtp_settings = {
  :user_name => 'MAILTRAP_USER',
  :password => 'AAaa11!!',
  :address => 'smtp.mailtrap.io',
  :domain => 'smtp.mailtrap.io',
  :port => '2525',
  :authentication => :cram_md5
}
```

À partir de là tous les emails de l'app iront se ranger dans notre boite sur Mailtrap.

## Figaro

C'est une **TRÈS** mauvaise idée de commit des clés d'API, des noms d'utilisateur ou des password. Pour la production ou le staging, heroku nous permet de les setup. Pourtant il arrive qu'on en ait besoin en dev. Dans ce cas on utilise figaro (ou dotenv) pour les stocker uniquement sur notre machine et ne jamais les commit. Exemple avec Figaro:

On transforme le fichier d'environnement de la façon suivante:

{{< filename "config/environnements/development.rb" >}}
```ruby
config.action_mailer.delivery_method = :smtp
config.action_mailer.smtp_settings = {
  :user_name => ENV['MAILTRAP_USERNAME'],
  :password => ENV['MAILTRAP_PASSWORD'],
  :address => 'smtp.mailtrap.io',
  :domain => 'smtp.mailtrap.io',
  :port => '2525',
  :authentication => :cram_md5
}
```
Puis on ajoute ces deux lignes dans le fichier `application.yml`:
```yaml
MAILTRAP_USERNAME: MAILTRAP_USER
MAILTRAP_PASSWORD: AAaa11!!
```

Voilà on peut continuer d'utiliser Mailtrap sans pour autant mettre nos clés sur github a la portée des pirates.

## Sidekiq

Mailtrap est plutôt rapide (de l'ordre de ~300ms), mais on verra en production que Sendgrid c'est plus de l'ordre de la seconde et demie.
Mais que se passerait il si Sendgrid prenait plus de 20 secondes pour répondre ?
Serait il bien sage de faire attendre l'utilisateur aussi longtemps à chaque création de tortue pour un mail? (La réponse est non :D )

On va donc mettre en place un système pour process des taches de fond.
Pour ça on va utiliser Sendgrid qui est performant et facile a configurer.

Pour ajouter sendgrid et le faire fonctionner il y a une suite d'étape a respecter:

#### 1) On ajoute la gem

`gem 'sidekiq'`

#### 2) On ajoute redis a notre env de dev et a nos env de production

* En dev: on installe Redis sur notre machine.
* En staging/prod: On ajoute l'add-on "Heroku Redis"

#### 3) On ajoute une ligne dans le Procfile
{{< filename Procfile >}}
```yaml Procfile
worker: bundle exec sidekiq -q default -q mailers -c 10
```
-q xxx => process la queue xxx (ici default et mailers (c'est la que vont aller nos mails))
-c 10 => Limite le nombre de job en parallèle a 10 (Heroku ajoute un nombre maximum de connections a Redis en même temps donc il faut préciser un nombre assez bas pour ne pas atteindre cette limite)

Pour le lancer en dev on utilisera la même commande: `sidekiq -q default -q mailers` dans un autre terminal.

## ActiveJob

C'est bien beau tout ça mais nos mails ne vont pas encore dans sidekiq. Pour ça on va dire a ActiveJob qui est l'interface unifié pour les Jobs en rails de parler a sidekiq.

Ajouter dans le fichier application.rb:

{{< filename "config/application.rb" >}}
```ruby config/application.rb
config.active_job.queue_adapter = :sidekiq
```

Puis au lieu d'utiliser `deliver_now` dans nos appels de mailer on fait `deliver_later`:

```ruby
TurtleMailer.create(self).deliver_later
```

IMPORTANT: Pour ne pas créer des jobs en lançant ses tests: on ajoute à la fin du rails_helper:

{{< filename "spec/rails_helper.rb" >}}
```ruby spec/rails_helper.rb
ActiveJob::Base.queue_adapter = :test
```

Voilà.

## Sendgrid

Pour configurer Sendgrid:
On ajoute l'add-on en staging/production, puis on ajoute dans notre fichier d'environnement:

{{< filename "config/environnements/production.rb" >}}
```ruby config/environments/production.rb
config.action_mailer.delivery_method = :smtp
config.action_mailer.perform_deliveries = true
config.action_mailer.smtp_settings = {
  :user_name => ENV['SENDGRID_USERNAME'],
  :password => ENV['SENDGRID_PASSWORD'],
  :domain => 'yourdomain.com',
  :address => 'smtp.sendgrid.net',
  :port => 587,
  :authentication => :plain,
  :enable_starttls_auto => true
}
```

Heroku se charge de populer les clés de sendgrid.

## Conclusion

Voilà, vous avez maintenant un système de Background job fonctionnels et la possibilité d'envoyer des emails.
