need a way to switch between edit mode and display mode.
at launch, app is in display mode.

display mode will require new branches of the state tree: phrases, and active\_phrase.
 - phrases indexed by id
 - phrase objects have user id and words, an array of word ids
 - active\_phrase is an id, updated to change the displayed phrase

# Display mode
* the available words area and the phrase area rearrange to show the active phrase
* there should be a timeline indicator
* there should be a user info area with name and avatar to show who made the phrase
  * user info can be fetched from firebase by id when needed
* there should be a create new phrase button; pressing resets all words to available words,
  timeline to the end

# Edit mode
* needs a save button

## Plan
* update edit mode with save button
 * entails updating state tree
* create display mode to just show the first phrase
 * add phrase change by setInterval
  * make sure to clearInterval on route change
 * add rearrange animation
 * add user display area
 * add timeline
 * add create new button

# Other stuff
* ability to delete phrases that you have created in settings
* Immutable.js
