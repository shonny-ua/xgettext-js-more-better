'use strict';

var should = require('should');
var xgettext = require('..');

describe('xgettext-js-more-better', function () {
  it('should work', function () {
    var pos = xgettext('gettext("Hi")', {filename: 'foo.js'}).toPOs();
    pos.length.should.equal(1);
    pos[0].domain.should.equal('messages');
    pos[0].items.length.should.equal(1);

    var message = pos[0].items[0];
    message.msgid.should.equal('Hi');
    should(message.msgid_plural).not.be.ok;
    message.references.should.eql(['foo.js:1']);
  });

  it('should extract gettext as parameter', function () {
    var pos = xgettext('foo(gettext("Hi"))', {filename: 'foo.js'}).toPOs();
    pos.length.should.equal(1);
    pos[0].domain.should.equal('messages');
    pos[0].items.length.should.equal(1);

    var message = pos[0].items[0];
    message.msgid.should.equal('Hi');
    should(message.msgid_plural).not.be.ok;
    message.references.should.eql(['foo.js:1']);
  });

  it('should extract correct line number', function () {
    var pos = xgettext('\ngettext("Hi")', {filename: 'foo.js'}).toPOs();
    pos.length.should.equal(1);
    pos[0].domain.should.equal('messages');
    pos[0].items.length.should.equal(1);

    var message = pos[0].items[0];
    message.msgid.should.equal('Hi');
    message.references.should.eql(['foo.js:2']);
  });

  // TODO more tests
});
