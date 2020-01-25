# Routing functionality for the /localTime endpoint

This directory contains three different files: one handles routing, one query
parsing, and one the actual retrieval of the local time. One advantage of this
way of organizing the files is that it's easy to replace one bit of
functionality with another--for example, if we have an error in the query
parser, we can just fix that one file.

A disadvantage is that it can be harder to develop if you're constantly having
to switch between several files, or if you have to keep them all open
simultaneously. Often this is unavoidable, especially if you're dealing with a
complex problem that demands highly modular code. But if you have only a few
functions to deal with, and they're all related by domain/functionality, it's
often easier to have them all in the same file.
