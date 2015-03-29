

angular.module("keyFunctions", []).directive("kfInit",
    function () {
        var keycodes = {
            'backspace': 8,
            'Tab': 9,
            'Enter': 13,
            'Shift': 16,
            'Ctrl': 17,
            'Alt': 18,
            'Pause': 19,
            'Capslock': 20,
            'Escape': 27,
            'Pageup': 33,
            'Pagedown': 34,
            'End': 35,
            'Home': 36,
            'Leftarrow': 37,
            'Uparrow': 38,
            'Rightarrow': 39,
            'Downarrow': 40,
            'Insert': 45,
            'Delete': 46,
            '0': 48,
            '1': 49,
            '2': 50,
            '3': 51,
            '4': 52,
            '5': 53,
            '6': 54,
            '7': 55,
            '8': 56,
            '9': 57,
            'A': 65,
            'B': 66,
            'C': 67,
            'D': 68,
            'E': 69,
            'F': 70,
            'G': 71,
            'H': 72,
            'I': 73,
            'J': 74,
            'K': 75,
            'L': 76,
            'M': 77,
            'N': 78,
            'O': 79,
            'P': 80,
            'Q': 81,
            'R': 82,
            'S': 83,
            'T': 84,
            'U': 85,
            'V': 86,
            'W': 87,
            'X': 88,
            'Y': 89,
            'Z': 90,
            'Leftwindow': 91,
            'Rightwindow': 92,
            'select key': 93,
            'Numpad0': 96,
            'Numpad1': 97,
            'Numpad2': 98,
            'Numpad3': 99,
            'Numpad4': 100,
            'Numpad5': 101,
            'Numpad6': 102,
            'Numpad7': 103,
            'Numpad8': 104,
            'Numpad9': 105,
            'Multiply': 106,
            'Add': 107,
            'Subtract': 109,
            'Decimalpoint': 110,
            'Divide': 111,
            'F1': 112,
            'F2': 113,
            'F3': 114,
            'F4': 115,
            'F5': 116,
            'F6': 117,
            'F7': 118,
            'F8': 119,
            'F9': 120,
            'F10': 121,
            'F11': 122,
            'F12': 123,
            'Numlock': 144,
            'Scrolllock': 145,
            'Semicolon': 186,
            'Equal': 187,
            'Comma': 188,
            'Dash': 189,
            'Period': 190,
            'Forwardslash': 191,
            'Graveaccent': 192,
            'Openbracket': 219,
            'Backslash': 220,
            'Closebraket': 221,
            'Singlequote': 222
        };

        var modifiers = [
            {
                name: "",
                evaluation: function (e) {
                    return true;
                }
            },
            {
                name: "Ctrl",
                evaluation: function (e) {
                    return e.ctrlKey;
                }
            },
            {
                name: "Alt",
                evaluation: function (e) {
                    return e.altKey;
                }
            },
            {
                name: "Shift",
                evaluation: function (e) {
                    return e.shiftKey;
                }
            }
        ];

        var actions = { defaultBind: "keydown keypress", down: "keydown", press: "keypress", up: "keyup" };
        return {
            restrict: 'A',
            controller: function ($scope, $rootScope, $attrs) {
            },
            link: function (scope, el, attr, controller) {
                var bindings = attr.kfInit.split(",");
                var binds = "";
                if (bindings.length == 1 && bindings[0] == "") {
                    binds = actions.defaultBind;
                } else {
                    for (var n = 0; n < bindings.length; n++) {
                        if (actions.hasOwnProperty(bindings[n])) {
                            binds += bindings[n] + " ";
                        }
                    }
                }
                for (var a in attr) {
                    if (a.indexOf("kf") == 0 && a != "kfInit") {
                        var modifier = modifiers[0];
                        for (var i = 1; i < modifiers.length; i++) {
                            if (a.indexOf(modifiers[i].name) == 2) {
                                modifier = modifiers[i];
                                i = modifiers.length;
                            }
                        }
                        var key = a.substring(2 + modifier.name.length);
                        if (key.length == 0) {
                            key = modifier.name;
                            modifier = modifiers[0];
                        }
                        if (!keycodes.hasOwnProperty(key)) {
                            throw "Invalid Key " + key;
                        }

                        var keycode = keycodes[key];
                        var myfunction = attr[a];
                        el.bind(binds, function (event) {
                            if (event.which == keycode && modifier.evaluation(event)) {
                                scope.$apply(function () {
                                    scope.$eval(myfunction);
                                });
                                event.preventDefault();
                            }
                        });
                    }
                }
            }
        };

    });
