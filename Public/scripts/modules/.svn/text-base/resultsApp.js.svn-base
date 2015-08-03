(function() {

    define([], function() {

        window.App = {
            Models: {},
            Views: {
                Page: "",
                SlideMenu: "",
                Modal: ""
            },
            Collections: {},
            i: {
                Models: {},
                Views: {},
                Collections: {}
            }
        };

        App.Models.SlideMenu = Backbone.Model.extend({
            defaults: {
                income: 55000,
                householdsize: 3,
                individuals: [35, 40, 5]
            }
        });

        App.Models.Individual = Backbone.Model.extend();

        App.Views.SlideMenu = Backbone.View.extend({
            el: $('div#navbar'),

            initialize: function() {
                var thiz = this;
                this.$main = $('[context="Main"]');

                this.model = new App.Models.SlideMenu();
                this.$income = $('[name="income"]');
                this.$householdsize = $('[name="household_size"]');
                this.$individualstable = $('[context="Individuals"] tbody');

                this.$income.val(this.model.get('income'));

                this.$el.mmenu()
                    .on("opened.mm", function() {
                        thiz.scrolling();
                    })
                    .on('opening.mm', function() {
                        thiz.opening();
                    })
                    .on('closing.mm', function() {
                        thiz.closing();
                    });

                this.$householdsize.multiselect({
                    includeSelectAllOption: true,
                    buttonWidth: '50px'
                });

                thiz.renderIndividuals();

                setTimeout(function() {
                    thiz.$el.find('section').css('display', 'block');
                }, 500);
            },

            events: {
                'click button[action="Cancel"]': 'cancel',
                'click button[action="Submit"]': 'submit',
                'click button[action="AddIndividual"]': 'addIndividual',
                'click button[action="RemoveIndividual"]': 'removeIndividual',
                'keyup input[name="income"]': 'addComma',
            },

            individuals: [],

            addComma: function() {
                // var nStr = parseInt(this.$income.val().replace(',', ''));
                // nStr = nStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");



                // this.$income.val(nStr.toLocaleString())
            },

            renderIndividuals: function() {
                var thiz = this;
                var ind = this.model.get('individuals');
                var i = 0;

                _.each(ind, function(e) {
                    i++;
                    var ind = new App.Models.Individual({
                        age: e,
                        length: i
                    });
                    thiz.individuals.push(ind);

                    thiz.$individualstable.append(new App.Views.IndividualRow({
                        model: ind
                    }).render().$el);
                });

                console.log(this.individuals);

                this.changeNumbering();
            },

            addIndividual: function() {
                var ind = new App.Models.Individual({
                    age: '',
                    length: (this.individuals.length + 1)
                });
                this.individuals.push(ind);

                this.$individualstable.append(new App.Views.IndividualRow({
                    model: ind
                }).render().$el);
                this.changeNumbering();
            },

            removeIndividual: function(e) {
                var id = $(e.currentTarget).parents('tr').attr('id'),
                    index = this.individuals.indexOf(id),
                    $tr = this.$individualstable.find('#' + id),
                    thiz = this;

                if (index > -1) {
                    his.individuals.splice(index, 1);
                }

                $tr.fadeOut('100', function() {
                    $tr.remove();
                    thiz.changeNumbering();
                });
            },

            changeNumbering: function() {
                var i = 0;
                this.$individualstable.find('tr').each(function() {
                    i++;
                    $(this).find('[context="Numbering"]').html(i);
                });
            },

            submit: function() {
                this.model.set('income', this.$income.val());
                this.model.set('householdsize', this.$householdsize.val());

                var inds = [];
                this.$individualstable.find('input[type="text"]').each(function() {
                    console.log($(this).val());
                    inds.push($(this).val());
                });

                this.model.set('individuals', inds);
                App.i.Views.SlideMenu.$el.trigger("close");

                console.log(this.model.toJSON());
            },

            cancel: function() {
                App.i.Views.SlideMenu.$el.trigger("close");
            },

            opening: function() {
                this.$main.animate({
                    opacity: 0.6
                }, 400);
            },

            closing: function() {
                this.$main.animate({
                    opacity: 1
                }, 400);
            },

            scrolling: function() {
                var topPad = this.$el.find('section').offset().top,
                    viewableArea = $(window.top).height(),
                    height = viewableArea - topPad;

                this.$el.find('section')
                    .css('overflow', 'scroll')
                    .css('height', height + 'px');
            }
        });

        App.Views.IndividualRow = Backbone.View.extend({
            tagName: 'tr',
            template: _.template($('#IndividualRow').html()),
            render: function() {
                this.$el.attr('id', this.model.get('length'));
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            }
        });

        App.Views.Filter = Backbone.View.extend({
            el: $('[context="Filter"]'),

            initialize: function() {
                this.$carrierselect = $('select[name="carrier"]');
                this.$sortselect = $('select[name="results-sort"]');
                this.$hmo = $('input[name="HMO"]');


                $('.btn').click(function() {
                  console.log(this);
               });

                console.log(this.$hmo.is(':checked'));

                this.$carrierselect.multiselect({
                    includeSelectAllOption: true,
                    buttonWidth: '150px'
                });

                this.$sortselect.multiselect({
                    buttonWidth: '150px'
                });
            },

            events: {
                'changed input[name="HMO"]': 'changeType'
            },

            changeType: function(){
                console.log(this.$hmo.is(':checked'));
            }
        });

        App.Collections.Results = Backbone.Collection.extend();

        App.Views.Results = Backbone.View.extend({
            el: $('[context="Results"]'),
            initialize: function() {
                this.buildCollection();
                this.render();
            },

            buildCollection: function() {
                this.collection = new App.Collections.Results();

                for (var i = 0; i < 20; i++) {
                    this.collection.add(this.randomize(new App.Models.Result()));
                }
            },

            render: function() {
                var thiz = this;
                this.collection.each(function(result) {
                    thiz.$el.prepend(new App.Views.Result({
                        model: result
                    }).render().$el);
                });
            },
            randomize: function(model) {

                var carrier = [
                    'Blue Cross Blue Shield of Illinois',
                    'UnitedHe`althcare',
                    'HUMANA',
                    'Cigna',
                    'Aetna',
                    'UniCare'
                ];

                model.set('carrier', carrier[Math.floor((Math.random() * carrier.length))]);

                var type = [
                    'PPO',
                    'HMO'
                ];
                model.set('type', type[Math.floor((Math.random() * type.length))]);

                var level = [
                    'bronze',
                    'catastrophic',
                    'silver',
                    'gold',
                    'platinum'
                ];

                model.set('level', level[Math.floor((Math.random() * level.length))]);



                return model;


            }
        });

        App.Models.Result = Backbone.Model.extend();

        App.Views.Result = Backbone.View.extend({
            tagName: 'div',
            className: 'row',
            template: _.template($('#Result').html()),
            render: function() {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            }
        });

        App.Views.Modal = Backbone.View.extend({
            el: $('#myModal'),

            initialize: function() {
                var thiz = this;
                setTimeout(function() {
                    thiz.$el.modal('show');
                }, 500);
            },

            events: {
                'click button[context="SlideMenu"]': 'openSlideMenu'
            },

            openSlideMenu: function() {
                var thiz = this;
                this.$el.modal('hide');
                setTimeout(function() {
                    App.i.Views.SlideMenu.$el.trigger("open");
                }, 500);
            }
        });

        App.Views.FAQ = Backbone.View.extend({
            el: $('#faq'),

            initialize: function() {
                this.$el.mmenu({
                    classes: 'mm-light',
                    position: 'bottom',
                    zposition: 'front'
                });
            }
        });

        return App;

    });

})();