# Machine rental photos

Drop a photo of each machine into this folder and it appears on the homepage,
in the strip under "Party Concession Rentals". Remove it and it's gone. No code
to edit.

```
rentals/
  cotton-candy-machine.jpg   →  caption: "Cotton Candy Machine"
  popcorn-machine.jpg        →  caption: "Popcorn Machine"
  snow-cone-machine.jpg      →  caption: "Snow Cone Machine"
```

**The filename is the caption**, with the dashes taken out and each word
capitalized — so name files after the machine. Photos show in alphabetical
order; `01-`, `02-` prefixes control that if you want a specific order.

While the folder has no photos in it, the strip doesn't render at all and the
rentals banner looks exactly as it does now.

## rentals.json (optional)

Only needed to override a caption or write proper alt text:

```json
{
  "cotton-candy-machine.jpg": {
    "name": "Cotton Candy Machine",
    "alt": "A red and silver cotton candy cart set up at an outdoor party"
  }
}
```

Without it, alt text falls back to the caption, which is usually fine for a
photo whose caption already names the thing pictured.
