(function() {
  var Tokenizer = (function() {
    var Tokenizer = function(options) {
        this.parseHtmlEnteties = function(str) {
            return str.replace(/&#([0-9]{1,3});/gi, function(match, numStr) {
                var num = parseInt(numStr, 10);
                return String.fromCharCode(num);
            });
        }
        this.tokenize = function(sentence){
            var sent = this.parseHtmlEnteties(sentence);
            sent = sent.toLowerCase();
            sent = sent.replace(/(www\.|https?|s?ftp)\S+/g,"");
            sent = sent.replace(/\S+@\S+/g,"");
            sent = sent.replace(/(@|#)\S+/g,"");
            sent = sent.replace(/&.*;/g,"");
            sent = sent.replace(/[^a-z\s]/g," ");
            sent = sent.replace(/\s+/g," ");
            sent = sent.trim().replace(/&nbsp;/g, '').replace(/<[^\/>][^>]*><\/[^>]+>/g, "");
            return sent.split(/\s+/);
        }
    };
    return Tokenizer;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Tokenizer;
  else
    window.Tokenizer = Tokenizer;
})();
