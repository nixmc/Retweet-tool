# NixonMcInnes Retweet Tool

This tool counts the retweets of a given Twitter user between two given dates and allows the user to then download a
CSV of the information.

You can check the tool out at [http://retweets.nixonmcinnes.co.uk](http://retweets.nixonmcinnes.co.uk)

It has been built with the following libs and things:
* Remy Sharp's excellent [Twitter Lib](https://github.com/remy/twitterlib) and so runs completely
client side, without the need for authentication or anything.
* dcneiner's [Downloadify](https://github.com/dcneiner/Downloadify), client side file creation tool in order that we can just host this on S3
* Jacques-Yves Bleau's [htmlencode library](http://www.strictly-software.com/htmlencode)
* (JQuery)[http://jquery.com/]
* (JQueryUI)[http://jqueryui.com/]
* fgnass' excellent (Spin.js)[http://fgnass.github.com/spin.js/]
* The CSV Icon from the (RRZE Icon Set)[http://rrze-icon-set.berlios.de/index.html]
* The (Arvo Google Webfont)[http://www.google.com/webfonts/specimen/Arvo]

---

Copyright (C) 2011 by NixonMcInnes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.