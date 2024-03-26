import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'highlighter'
})
export class HighlighterPipe implements PipeTransform {

  transform(value: any, args: any, type: string): unknown {
    if (!args) return value;

    const htmlTagsRegex = /<[^>]*>/g;
    let match;
    let result = '';

    while ((match = htmlTagsRegex.exec(value)) !== null) {
      const textBeforeTag = value.substring(0, match.index);

      if (textBeforeTag) {
        result += this.applyHighlight(textBeforeTag, args, type);
      }

      result += match[0];

      value = value.substring(match.index + match[0].length);
    }

    // Wende die Markierung auf den restlichen Text an (nach dem letzten HTML-Tag)
    result += this.applyHighlight(value, args, type);

    return result;
  }

  private applyHighlight(text: string, args: string, type: string): string {
    // Extrahiere den reinen Text aus HTML-Tags
    const textWithoutTags = text.replace(/<[^>]*>/g, '');

    if (type === 'full') {
      const re = new RegExp("\\b(" + args + "\\b)", 'igm');
      return textWithoutTags.replace(re, '<span class="highlighted-text">$1</span>');
    } else {
      const re = new RegExp(args, 'igm');
      return textWithoutTags.replace(re, '<span class="highlighted-text">$&</span>');
    }
  }

}
