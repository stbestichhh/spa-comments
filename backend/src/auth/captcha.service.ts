import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class CaptchaService {
  private store: Map<string, string> = new Map<string, string>();

  public generate(sessionId: string) {
    const captcha = svgCaptcha.create({
      size: 5,
      noise: 2,
      ignoreChars: 'iLl10I',
      color: true,
      background: '#ccf2ff',
    });

    this.store.set(sessionId, captcha.text.toLowerCase());

    return captcha.data;
  }

  public validate(sessionId: string, input: string) {
    const expected = this.store.get(sessionId);
    if (!expected) return false;

    const ok = expected === input.toLowerCase();
    if (ok) {
      this.store.delete(sessionId);
    }

    return ok;
  }
}
