# Lessons Learned from my first own portfolio website

+ ```<html lang=en></html>```
  - Reference: https://www.tpgi.com/using-the-html-lang-attribute/#:~:text=The%20HTML%20lang%20attribute%20is,the%20correct%20accent%20and%20pronunciation.
  - Used to define what language the website contains.
  - It is also used by the web search engines like google to get better search results
+ ```<meta name="viewport" content="width=device-width, initial-scale=1">```
  - viewport is ***NOT*** a standart html tag! It was introduced in safari and got adapted by the most browsers and is done to make responsive web design work properly
  - Makes the content scaled on the device width and not scrollable
    * This is necessary to program a responsive website for different mobile and desktop views
+ Using google fonts api:
  - Tag this in the css on the body tag
  - References:
    * https://developers.google.com/fonts/docs/getting_started
    * https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag  
+ Colors in CSS:
  - Here you can try out rgb values and get the definition for the CSS file
  - color tag is used as the font `color` and `backgroud-color` as the background color (surprise :-D)
  - https://www.w3schools.com/css/css_colors_rgb.asp
+ CSS use rules on all tags:
  - ``` * {
          rule: value;
          rule2: value
        }
    ```
+ Images scaled with the bootstrap grid:
  - https://www.w3schools.com/howto/howto_css_image_grid_responsive.asp
