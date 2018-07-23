** Spring Data REST ** exposes all the properties, even associations :
- You can use @JsonIgnore from Jackson's library
- Better practice : using the DTO pattern and my own RestController.
- You can also use Jersey library

** Run JUNIT 5 with JDK 9 ** JAB dependency has been removed from Java 9
you need to add it in pom.xml to avoid NotDefClass exception.

** Autocompletion ** En general on relance la request chaque 3 caractères.

** Question ** 
	- One Repository with Cascade OR Multiple Repositories ??
	- OneToMany vs ManyToOne
	- Unidirectionnal vs Bidirectionnal association ?
