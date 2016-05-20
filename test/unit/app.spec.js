describe('app', function () {
    'use strict';

    var app = window.app;

    describe('generateMessage', function () {
        it('should return 2 and true for parameter "ala"', function(){
            expect(app.generateMessage('ala')).toEqual({vowel: 2, palindrome: true });
        });
        it('should return vowel count and true', function(){
            expect(app.generateMessage("rotor")).toEqual({vowel: 2, palindrome: true});
            expect(app.generateMessage("zaraz")).toEqual({vowel: 2, palindrome: true});
            expect(app.generateMessage("owocowo")).toEqual({vowel: 4, palindrome: true});
            expect(app.generateMessage("łapał")).toEqual({vowel: 2, palindrome: true});
        });
        it('should return vowel count and false', function(){
            expect(app.generateMessage("zeszyt")).toEqual({vowel: 2, palindrome: false});
            expect(app.generateMessage("ksiazka")).toEqual({vowel: 3, palindrome: false});
            expect(app.generateMessage("monitor")).toEqual({vowel: 3, palindrome: false});
            expect(app.generateMessage("lampa")).toEqual({vowel: 2, palindrome: false});
        });

    });

    describe('isPalindrome', function () {

        describe('toHaveBeenCalled', function () {
            beforeAll(function(){
                spyOn(app, 'isPalindrome');
                app.isPalindrome('zaraz');
            });
            it('should call isPalindrome function', function(){
                expect(app.isPalindrome).toHaveBeenCalled();
                expect(app.isPalindrome).toHaveBeenCalledWith('zaraz');
            });

        });

        describe('and.callThrough', function () {
            beforeAll(function(){
                spyOn(app, 'isPalindrome').and.callThrough();
                app.isPalindrome('zaraz');
            });
            it('should call isPalindrome function when generateMessage call', function(){
                expect(app.isPalindrome).toHaveBeenCalled();
                expect(app.isPalindrome).toHaveBeenCalledWith('zaraz');
            });
        });

        describe('and.returnValue', function () {
            var palindrome;
            beforeAll(function(){
                spyOn(app, 'isPalindrome').and.returnValue(true);
            });
            it('should call isPalindrome and return true', function(){
                palindrome = app.isPalindrome('ala');
                expect(palindrome).toBe(true);
            });
            it('should call generateMessage and isPalindrome should return true', function(){
                palindrome = app.generateMessage('zaraz');
                expect(palindrome).toEqual({vowel: 2, palindrome:true});
            });
        });

        describe('and.callFake', function () {
            var palindrome;
            beforeAll(function(){
                spyOn(app, 'isPalindrome').and.callFake(function(text){
                    var str = text.toLowerCase();
                    var length = str.length;
                    var halfLength = (length%2 === 0) ? (length/2):((length-1) / 2);
                    for(var i = 0; i < halfLength; i++ ){
                        if(str[i] !== str.slice(-1,-i)[0])
                            return false;
                    }
                    return true;
                });
            });
            it('should return true', function(){
                palindrome = app.isPalindrome('zaraz');
                expect(palindrome).toEqual(false);
            });
        });

        describe('calls.count()', function () {
            var palindrome;
            beforeAll(function(){
                spyOn(app, 'isPalindrome').and.callThrough();
            });
            it('should notice that isPalindrome is call', function () {
                palindrome = app.isPalindrome('zaraz');
                expect(app.isPalindrome.calls.count()).toBe(1);
            });
        });
    });

    describe('vowelCount', function () {

        describe('toHaveBeenCalled', function () {
            beforeAll(function(){
                spyOn(app, 'vowelCount');
                app.vowelCount('zaraz');
            });
            it('should call vowelCount function', function(){
                expect(app.vowelCount).toHaveBeenCalled();
                expect(app.vowelCount).toHaveBeenCalledWith('zaraz');
            });
        });

        describe('and.callThrough', function () {
            beforeAll(function(){
                spyOn(app, 'vowelCount').and.callThrough();
                app.vowelCount('zaraz');
            });
            it('should call vowelCount function', function(){
                expect(app.vowelCount).toHaveBeenCalled();
                expect(app.vowelCount).toHaveBeenCalledWith('zaraz');
            });
        });

        describe('and.returnValue', function () {
            var count;
            beforeAll(function () {
                spyOn(app, 'vowelCount').and.returnValue(2);
            });
            it('should call vowelCount and return 2', function(){
                count = app.vowelCount('zaraz');
                expect(count).toBe(2);
            });
            it('should call generateMessage and vowelCount should return 2', function(){
                count = app.generateMessage('zaraz');
                expect(count).toEqual({vowel: 2, palindrome: true});
            });

        });

        describe('and.callFake', function () {
            var count;
            beforeAll(function () {
                spyOn(app, 'vowelCount').and.callFake(function (txt) {
                    return 10;
                });
                it('should return vowelCount and return 10', function(){
                    count = app.vowelCount('zaraza');
                    expect(count).toBe(10);
                });
                it('should call generateMessage and vowelCount fake function', function(){
                    count = app.generateMessage('zaraza');
                    expect(count).toEqual({vowel:10, palindrome:true});
                });
            });
        });

        describe('calls.count()', function () {
            var count;
            beforeAll(function () {
                spyOn(app, 'vowelCount').and.callThrough();
            });
            it('should notice that call vowelCount is call', function(){
                count = app.vowelCount('zaraz');
                expect(app.vowelCount.calls.count()).toBe(1);
            });
            it('should notice that vowelCount is call when generateMessage is call', function(){
                count = app.generateMessage('zaraz');
                expect(app.vowelCount.calls.count()).toEqual(2);
            });

        });
    });
});

