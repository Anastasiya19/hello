var blockAligner = {
  setEqHeight: function(wrapper, selector, toMinimal) {
    var items = $(wrapper).find(selector);
    var prevs = [];
    var offsetTop = 0;
    items.each(function(index, item) {
      if (item.offsetTop == offsetTop) {
        prevs.push(item);
        return true;
      } else {
        blockAligner.equaliation(prevs, toMinimal);
        prevs = [item];
        offsetTop = item.offsetTop;
      }
    });
    blockAligner.equaliation(prevs);
  },
  equaliation: function(arr, toMinimal) {
    var maxPosition = toMinimal ? $(arr[0]).height()  : 0;
    arr.forEach(function(prev) {
      maxPosition = toMinimal ? Math.min(maxPosition, $(prev).height()) : Math.max(maxPosition, $(prev).height());
    });
    arr.forEach(function(prev) {
      $(prev).height(maxPosition);
    });
  }
};
