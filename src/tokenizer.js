export default class Tokenizer {
  parseHtmlEnteties(str) {
    return str.replace(/&#([0-9]{1,3});/gi, (match, numStr) =>
      String.fromCharCode(parseInt(numStr, 10))
    );
  }

  tokenize(sentence) {
    let sent = this.parseHtmlEnteties(sentence);
    sent = sent.toLowerCase();
    sent = sent.replace(/(www\.|https?|s?ftp)\S+/g, "");
    sent = sent.replace(/\S+@\S+/g, "");
    sent = sent.replace(/(@|#)\S+/g, "");
    sent = sent.replace(/&.*;/g, "");
    sent = sent.replace(/[^a-z\s]/g, " ");
    sent = sent.replace(/\s+/g, " ");
    sent = sent
      .trim()
      .replace(/&nbsp;/g, "")
      .replace(/<[^\/>][^>]*><\/[^>]+>/g, "");
    return sent.split(/\s+/);
  }
}
