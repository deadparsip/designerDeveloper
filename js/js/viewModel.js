$(document).ready(function () {
  work = true;
  function finish() {
    work = true;
  }
  var autoComp = $('.autoComp');
  var skillInput = $('.new-skills input');

  $(skillInput).keydown(function (e) {
    if (e.keyCode == 13) {      
      skills.viewModel.addSkill();
	  }
	  });

  function SkillManager(skills) {
    this.skills = skills || {};
  }

  function Skill(name, experience) {
    this.name = ko.observable(name);
  }
  
  SkillManager.prototype.init = function () {
    var thisObj = this;
    this.elements = {
      input: $(".new-skills input"),
      select: $(".new-skills select"),
      error: $(".error")
    };
    this.errors = {
      nullerror: 'You cannot add nothing!',
      duplerror: 'you already have this activity in your list'
    };

    this.suggestions = [{
      name: 'Advocating a cat'
    }, {
      name: 'Combing secretaries'
    }, {
      name: 'Disputing more wrath'
    }, {
      name: 'Woahing at a stampede'
    }];

    this.viewModel = {
      skillList: ko.observableArray(),
      suggestionsList: ko.observableArray(),
      hasErrors: ko.observable(false),
      error: ko.observable(""),
      cleanErrors: function () {
        thisObj.viewModel.error(false);
        return true;   
      },
      addSkill: function () {
        if (thisObj.elements.input.val().replace(/ +?/g, '')) {
          for (var i = 0; i < thisObj.viewModel.skillList().length; i++) {
            if (thisObj.viewModel.skillList()[i].name().toLowerCase().replace(/ +?/g, '') == thisObj.elements.input.val().toLowerCase().replace(/ +?/g, '')) {
              thisObj.viewModel.error(thisObj.errors.duplerror);
              thisObj.elements.input.val('');
              return;
            }
          }
          thisObj.viewModel.skillList.unshift(new Skill(thisObj.elements.input.val().replace(/^\s*/, "").replace(/\s*$/, "")));
          thisObj.elements.input.val('');
        } else {
          thisObj.viewModel.error(thisObj.errors.nullerror);
        }
      },
      removeSkill: function (skill) {
        thisObj.viewModel.skillList.remove(skill);
        thisObj.viewModel.suggestionsList.unshift(skill);
      },
      addSuggested: function (skill) {
        if (thisObj.viewModel.skillList().length >= 30) return;
        for (var i = 0; i < thisObj.viewModel.skillList().length; i++) {
          if (thisObj.viewModel.skillList()[i].name().toLowerCase().replace(/ +?/g, '') == skill.name().toLowerCase().replace(/ +?/g, '')) {
            return;
          }
        }
        thisObj.viewModel.skillList.unshift(skill);
        thisObj.viewModel.suggestionsList.remove(skill);
      }
    };

    if (this.skills.length) {
      for (var i = 0; i < this.skills.length; i++) {
        this.viewModel.skillList.unshift(new Skill(this.skills[i].name, this.skills[i].experience));
      }
    }


    if (this.suggestions.length) {
      for (var i = 0; i < this.suggestions.length; i++) {
        this.viewModel.suggestionsList.push(new Skill(this.suggestions[i].name, this.suggestions[i].experience));
      }
    }

    ko.applyBindings(this.viewModel, $(".base-wrapper")[0]);
  };

  var initial = [{
    name: 'photograph windows'
  }, {
    name: 'stand up'
  }];
  var skills = new SkillManager(initial);
  skills.init();

   <!--ko.applyBindings(new ClickCounterViewModel());-->

});