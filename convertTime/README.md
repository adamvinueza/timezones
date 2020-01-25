# Routing functionality for the /convertTime endpoint

This directory contains only one file that handles routing, query parsing, and
time conversion.  One advantage of this way of organizing the functionality is
that it's easy to survey and change the functionality if everything's in one
file. (Note that having everything in one file does NOT mean just mushing all
the functionality together inappropriately!)

Putting all the functionality into a single file, however, will make less sense
as the size of the file grows. This will generally indicate that what you're
working with has grown complex enough to merit splitting off separate bits of
functionality anyway.
