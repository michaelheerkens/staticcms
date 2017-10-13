/* var data = {
    name: 'Michael',
    phone: {
        office: '22-44-8723',
        home: '01-02-3342'
    },
    items: [
        { name: 'John', age: 22 },
        { name: 'Tom', age: 31 },
        { name: 'Jin', age: 28 }
    ],
    people: ['Tim', 'Cook', 'Hana'],
}
*/
/* fetchData('https://hello-cms.herokuapp.com/api/products', function (_products) {
    var data = {
        products: JSON.parse(_products),
        test:{app:[1,2,3]}
    }
}  */
var mainColor = 'red'
var pages = [
    { name: 'John', tags: [2, 4, 87] },
    { name: 'Tom', tags: [1, 4, 6, 7] },
    { name: 'Jin', tags: [28] }
]
var pinned = true
var message = 'Hi'
var one = 'Bye'
var products = [{ name: 'Car', id: 2, visible: true, color: 'red' }, { name: 'Pen', id: 3, visible: false, color: 'blue' }, { name: 'Book', id: 4, visible: true, color: 'green' }]
var names = ['Tom', 'Jack']
/* function changeMessage() {
    message = 'Bye'
    products.f = 'Bye'
} */

window.onload = function () {
    compile()
}