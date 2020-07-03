const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var async = require('async');
var Book = require('../models/book');
var Author = require('../models/author');

// Display list of all Authors.
exports.author_list = function(req, res, next) {

  Author.find()
    .populate('author')
    .sort([['family_name', 'ascending']])
    .exec(function (err, list_authors) {
      if (err) { return next(err); }
      //Successful, so send json
      res.json ( list_authors );
    });

};

// Display detail page for a specific Author.
exports.author_detail = function(req, res, next) {

    async.parallel({
        author: function(callback) {
            Author.findById(req.params.id)
              .exec(callback)
        },
        authors_books: function(callback) {
          Book.find({ 'author': req.params.id },'title summary')
          .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.author==null) { // No results.
            var err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
      //Successful, so send json
        res.json (results.author );
    });

};

// Display Author create form on GET.
exports.author_create_get = function(req, res, next) {
    res.json('Create Author');
};

// Handle Author create on POST.
exports.author_create_post = [

    // Validate fields.
    body('name').isLength({ min: 1 }).trim().withMessage('Name must be specified.'),
    body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
    body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601(),

    // Sanitize fields.
    sanitizeBody('name').escape(),
    sanitizeBody('date_of_birth').toDate(),
    sanitizeBody('date_of_death').toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.status(400).json (errors.array());
            return;
        }
        else {
            // Data from form is valid.

            // Create an Author object with escaped and trimmed data.
            var author = new Author(
                {
                    name: req.body.name,
                    date_of_birth: req.body.date_of_birth,
                    date_of_death: req.body.date_of_death
                });
            author.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                res.redirect(author.url);
            });
        }
    }
];

// Display Author delete form on GET.
exports.author_delete_get = function(req, res, next) {

    async.parallel({
        author: function(callback) {
            Author.findById(req.params.id).exec(callback)
        },
        authors_books: function(callback) {
          Book.find({ 'author': req.params.id }).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.author==null) { // No results.
            res.redirect('/catalog/authors');
        }
      //Successful, so send json
    res.json( results.author );
    });

};

// Handle Author delete on POST.
exports.author_delete_post = function(req, res, next) {

    async.parallel({
        author: function(callback) {
          Author.findById(req.body.authorid).exec(callback)
        },
        authors_books: function(callback) {
          Book.find({ 'author': req.body.authorid }).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        if (results.authors_books.length > 0) {
            // Author has books. So send json.
            res.json( results.author );
            return;
        }
        else {
            // Author has no books. Delete object and redirect to the list of authors.
            Author.findByIdAndRemove(req.body.authorid, function deleteAuthor(err) {
                if (err) { return next(err); }
                // Success - go to author list
                res.redirect('/catalog/authors')
            })
        }
    });
};

// Display Author update form on GET.
exports.author_update_get = function(req, res) {
    Author.findById(req.params.id, function(err,author){
        if(err) return next(err);
        if (author == null) { // No results.
            var err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        res.json ( author );
    })
};

// Handle Author update on POST.
exports.author_update_post = [

     // Validate fields.
     body('name').isLength({ min: 1 }).trim().withMessage('Name must be specified.')
         .isAlphanumeric().withMessage('Name has non-alphanumeric characters.'),
     body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
     body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601(),

     // Sanitize fields.
     sanitizeBody('name').escape(),
     sanitizeBody('date_of_birth').toDate(),
     sanitizeBody('date_of_death').toDate(),

     // Process request after validation and sanitization.
     (req, res, next) => {

         // Extract the validation errors from a request.
         const errors = validationResult(req);

         if (!errors.isEmpty()) {
             // There are errors.
             res.json ( errors.array() );
             return;
         }
         else {
             // Data from form is valid.

             // Create an Author object with escaped and trimmed data.
             var author = new Author(
                 {
                     name: req.body.name,
                     date_of_birth: req.body.date_of_birth,
                     date_of_death: req.body.date_of_death,
                     _id: req.params.id
                 }
             );
             // Data from form is valid. Update the record.
                 Author.findByIdAndUpdate(req.params.id, author, {}, function (err,theauthor) {
                 if (err) { return next(err); }
                    // Successful - redirect to book detail page.
                    res.redirect(theauthor.url);
                 }
             );
         }
     }
 ];