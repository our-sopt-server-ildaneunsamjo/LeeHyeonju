var memberInfo  = [
    {
        name: '이현주', 
        age: 24, 
        sex: '여성', 
        printM: function () {
            console.log(this.name, this.age +"세", this.sex);
        }
    },
    {
        name: '김가인', 
        age: 25, 
        sex: '여성',
        printM: function () {
            console.log(this.name, this.age +"세", this.sex);
        }
    },
    {
        name: '김대현', 
        age: 25, 
        sex: '남성',
        printM: function () {
            console.log(this.name, this.age +"세", this.sex);
        }
    },
    {
        name: '이준호', 
        age: 25, 
        sex: '남성',
        printM: function () {
            console.log(this.name, this.age +"세", this.sex);
        }
    },
    {
        name: '조현아', 
        age: 23, 
        sex: '여성',
        printM: function () {
            console.log(this.name, this.age +"세", this.sex);
        }
    },
    {
        name: '최예원', 
        age: 24, 
        sex: '여성',
        printM: function () {
            console.log(this.name, this.age +"세", this.sex);
        }
    }
];


/**
 * Level 2. 조원들을 정보로 하는 JSON 배열 만들어 출력하기
 */
console.log('   LEVEL 2   ');
console.log('-------------');
console.log('이름  나이  성별');
console.log('-------------');
memberInfo.forEach(
    mInfo => mInfo.printM()
);




/**
 *  Level 3. forEach를 사용하여 조원들의 정보 출력하기
 */
console.log('\n\n   LEVEL 3   ');
console.log('-------------');
console.log('이름  나이  성별');
console.log('-------------');
memberInfo.forEach(
    mInfo => console.log(mInfo.name, mInfo.age+'세', mInfo.sex)
);