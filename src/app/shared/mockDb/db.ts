
import {InMemoryDbService} from 'angular-in-memory-web-api'; 
import {IUserCommon} from '../store/states/users/users.interface';
import {ICustomerGroup} from '../store/states/customers-groups/customers-groups.interface';
import {IProductCommon} from '../store/states/products/products.interface';
import {IOrderCommon} from '../store/states/orders/orders.interface';
import {IUpdateCommon} from '../store/states/updates/updates.interface';
import {getDate} from '../helpers/library';


export class InMemoryDataService implements InMemoryDbService {

createDb(){
	let customers:IUserCommon[] = [
	{id:'0',name:'Connor McGregor',groups:['0'],username:'Notorious',thumbnail:'connor',country:'Ireland',isOnline:false},
	{id:'1',name:'Nathan Diaz',groups:['0'],username:'Nate',thumbnail:'nate',country:'United States of America',isOnline:false},
	{id:'2',name:'Mark Hunt',groups:['1'],username:'The Super Samoan',thumbnail:'markhunt',country:'New Zealand',isOnline:false},
	{id:'3',name:'Fedor Emelianenko',groups:['1'],username:'The Last Emperor',thumbnail:'fedor',country:'Russia',isOnline:false},
	{id:'4',name:'Fabricio Werdum',groups:['1'],username:'Vai Cavalo',thumbnail:'fabricio',country:'Brazil',isOnline:false},
	{id:'5',name:'Mirko Filipovic',groups:['1'],username:'Cro Cop',thumbnail:'crocop',country:'Croatia',isOnline:false},
	{id:'6',name:'Jonathan Jones',groups:['1'],username:'Bones',thumbnail:'jones',country:'United States of America',isOnline:false},
	{id:'7',name:'Brok Lesnar',groups:['1'],username:'Broccoli',thumbnail:'broklesnar',country:'United States of America',isOnline:false},
	{id:'8',name:'Alexander Shlemenko',groups:['1'],username:'Storm',thumbnail:'shlemenko',country:'Russia',isOnline:false},
	{id:'9',name:'Yushin Okami',groups:[],username:'Thunder',thumbnail:'yushin_okami',country:'Japan',isOnline:false},
	{id:'10',name:'Alistar Overim',groups:[],username:'Demolition man',thumbnail:'alistar',country:'Netherlands',isOnline:false},
	{id:'11',name:'Roy Nelson',groups:['1'],username:'Big country',thumbnail:'roynelson',country:'United States of America',isOnline:false},

	];

	let customer_groups:ICustomerGroup[]=[
	{id:'0',title:'premium',style:'premium',users:{byId:[],length:null},createdAt:(new Date()).toString(),description:'This group includes clients with more than 1 purchase per week.They are entitled for special discounts and sales offers.'},
	{id:'1',title:'standard',style:'standard',users:{byId:[],length:null},createdAt:(new Date()).toString(),description:'This group includes clients with more less than 1 purchase per year.They don\'t have any perks whatsoever.'},
	{id:'2',title:'advanced',style:'advanced',users:{byId:[],length:null},createdAt:(new Date()).toString(),description:'Advanced subscription for our respective clients.'}
	];


	let products:IProductCommon[] = [
	{id:'0',title:'Angular: Up and Running',authors:['Shyam Seshadri'],description:`This book will demystify Angular as a framework, as well as provide clear instructions and examples on how to get started with writing scalable Angular applications.
Angular: Up & Running covers most of the major pieces of Angular, but in a structured manner that is generally used in hands-on training. Each chapter takes one concept, and use examples to cover how it works. Problems to work on (with solutions) at the end of each chapter reinforce the learnings of each chapter and allow readers to really get hands-on with Angular.`,
thumbnail:'angular_up_and_running',topics:['AngularJS'],price:6,release:getDate('July','2018')},
{id:'1',title:'Learning Angular - Second Edition',authors:['Pablo Deeleman','Christoffer Noring'],description:`Build modern SPAs by learning the latest and powerful features of Angular 5 and TypeScript 2.x.This book is for web developers who want to build the next generation of state-of-the-art mobile and desktop web applications with Angular. This book does not require you to have prior exposure to either Angular 1.x, 2 or 4, although comprehensive knowledge of JavaScript is assumed.`,
thumbnail:'learning_angular_second_e',topics:['Angular 5','TypeScript'],price:12.2,release:getDate('December','2017')},
{id:'2',title:'ASP.NET Core 2 and Angular 5',topics:['ASP.NET','Angular 5'],authors:['Valerio De Sanctis'],description:`This book is for seasoned ASP.NET developers who already know about ASP.NET Core and Angular in general, but want to know more about them and/or understand how to blend them together to craft a production-ready SPA.`,thumbnail:'asp_net_core_2_and_angular_5',
price:33.6,release:getDate('November','2017')},
{id:'3',title:'Switching to Angular - Third Edition',topics:['Angular 5','TypeScript'],authors:['Minko Gechev'],description:`Switching to Angular, Third Edition is the go-to book to align and get started with the Angular JavaScript framework. Angular contributor and international speaker Minko Gechev will help you square up and start building Angular apps and provide you an insight to the Google’s vision for the framework.`,
thumbnail:'switching_to_angular',price:8.25,release:getDate('October','2017')},
{id:'4',title:'Node.js, MongoDB and Angular Web Development, 2nd Edition',topics:['Node.js','MongoDB','Angular 5'],authors:['Caleb Dayley','Brendan Dayley','Brad Dayley'],description:`You’ll learn how to use Node.js and MongoDB to build more scalable, high-performance sites, how to leverage Angular’s innovative MVC approach to structure more effective pages and applications, and how to use all three together to deliver outstanding next-generation Web solutions.`,
thumbnail:'nodejs_mongodb_angular_webdevelopment',price:10,release:getDate('October','2017')},
{id:'5',title:'Effective JavaScript',topics:['Javascript'],authors:['David Herman'],
description:`It is uncommon to have a programming language wonk who can speak in such comfortable and friendly language as David does. His walk through the syntax and semantics of JavaScript is both charming and hugely insightful; reminders of gotchas complement realistic use cases, paced at a comfortable curve. You will find when you finish the book that you have gained a strong and comprehensive sense of mastery.`,
thumbnail:'effective_javascript',price:5,release:getDate('November','2012')},
{id:'6',title:'Mastering Modular JavaScript',topics:['Javascript'],authors:['Nicolas Bevacqua'],description:`Tackle two aspects of JavaScript development, modularity and ECMAScript 6 (ES6). With this practical guide, frontend and backend Node.js developers alike will learn how to scale out JavaScript applications by breaking codebases into smaller modules. Author Nicolas Bevacqua also covers features in ES6—the latest version of the specification that includes JavaScript—that support modularization.`,
thumbnail:'modular_javascript',price:18.25,release:getDate('June','2018')},
{id:'7',title:'Effective JavaScript',topics:['Javascript'],authors:['David Herman'],
description:`It is uncommon to have a programming language wonk who can speak in such comfortable and friendly language as David does. His walk through the syntax and semantics of JavaScript is both charming and hugely insightful; reminders of gotchas complement realistic use cases, paced at a comfortable curve. You will find when you finish the book that you have gained a strong and comprehensive sense of mastery.`,
thumbnail:'effective_javascript',price:5,release:getDate('November','2012')},
{id:'8',title:'Mastering Modular JavaScript',topics:['Javascript'],authors:['Nicolas Bevacqua'],description:`Tackle two aspects of JavaScript development, modularity and ECMAScript 6 (ES6). With this practical guide, frontend and backend Node.js developers alike will learn how to scale out JavaScript applications by breaking codebases into smaller modules. Author Nicolas Bevacqua also covers features in ES6—the latest version of the specification that includes JavaScript—that support modularization.`,
thumbnail:'modular_javascript',price:18.25,release:getDate('June','2018')},
{id:'9',title:'Effective JavaScript',topics:['Javascript'],authors:['David Herman'],
description:`It is uncommon to have a programming language wonk who can speak in such comfortable and friendly language as David does. His walk through the syntax and semantics of JavaScript is both charming and hugely insightful; reminders of gotchas complement realistic use cases, paced at a comfortable curve. You will find when you finish the book that you have gained a strong and comprehensive sense of mastery.`,
thumbnail:'effective_javascript',price:5,release:getDate('November','2012')},
{id:'10',title:'Mastering Modular JavaScript',topics:['Javascript'],authors:['Nicolas Bevacqua'],description:`Tackle two aspects of JavaScript development, modularity and ECMAScript 6 (ES6). With this practical guide, frontend and backend Node.js developers alike will learn how to scale out JavaScript applications by breaking codebases into smaller modules. Author Nicolas Bevacqua also covers features in ES6—the latest version of the specification that includes JavaScript—that support modularization.`,
thumbnail:'modular_javascript',price:18.25,release:getDate('June','2018')},
{id:'11',title:'Effective JavaScript',topics:['Javascript'],authors:['David Herman'],
description:`It is uncommon to have a programming language wonk who can speak in such comfortable and friendly language as David does. His walk through the syntax and semantics of JavaScript is both charming and hugely insightful; reminders of gotchas complement realistic use cases, paced at a comfortable curve. You will find when you finish the book that you have gained a strong and comprehensive sense of mastery.`,
thumbnail:'effective_javascript',price:5,release:getDate('November','2012')},
	];

let orders:IOrderCommon[] = [
{id:1,buyer:'1',products:['2','1'],status:'submitted',lastUpdated:getDate('January','2018','2'),amount:2,total:0},
{id:2,buyer:'0',products:['1','0'],status:'cancelled',lastUpdated:getDate('February','2018','5'),amount:2,total:0},
{id:3,buyer:'4',products:['4','2'],status:'submitted',lastUpdated:getDate('January','2018','4'),amount:2,total:0},
{id:4,buyer:'3',products:['5','6'],status:'awaiting payment',lastUpdated:getDate('January','2018','22'),amount:2,total:0},
{id:5,buyer:'5',products:['5','6'],status:'cancelled',lastUpdated:getDate('January','2018','22'),amount:2,total:0},
{id:6,buyer:'2',products:['5','6'],status:'finalized',lastUpdated:getDate('January','2018','22'),amount:2,total:0},
{id:7,buyer:'3',products:['5','6'],status:'cancelled',lastUpdated:getDate('February','2018','3'),amount:2,total:0},
{id:8,buyer:'8',products:['5','6'],status:'submitted',lastUpdated:getDate('January','2018','22'),amount:2,total:0},
{id:9,buyer:'1',products:['5','6'],status:'awaiting payment',lastUpdated:getDate('January','2018','22'),amount:2,total:0},
{id:10,buyer:'0',products:['5','6'],status:'finalized',lastUpdated:getDate('January','2018','22'),amount:2,total:0},
{id:11,buyer:'3',products:['3','6'],status:'finalized',lastUpdated:getDate('January','2018','2'),amount:2,total:0},
{id:12,buyer:'4',products:['2','6'],status:'submitted',lastUpdated:getDate('January','2018','22'),amount:2,total:0},
{id:13,buyer:'2',products:['5','6','1'],status:'submitted',lastUpdated:getDate('August','2017','22'),amount:3,total:0},
{id:14,buyer:'4',products:['5','6','1'],status:'finalized',lastUpdated:getDate('January','2018','22'),amount:3,total:0},
{id:15,buyer:'1',products:['5','1','2'],status:'finalized',lastUpdated:getDate('March','2017','22'),amount:3,total:0},
{id:16,buyer:'6',products:['0','6','1','3'],status:'finalized',lastUpdated:getDate('March','2017','22'),amount:3,total:0},
{id:17,buyer:'7',products:['5','1','2'],status:'finalized',lastUpdated:getDate('February','2018','1'),amount:3,total:0}
];
let updates:IUpdateCommon[]=[
{id:'1',user:'2',type:'submit_order',target:'13',timestamp:getDate('August','2017','22')},
{id:'2',user:'5',type:'cancelled_order',target:'5',timestamp:getDate('January','2018','22')},
{id:'3',user:'6',type:'left_message',timestamp:new Date()},
{id:'4',user:'2',type:'payed_order',target:'13',timestamp:getDate('August','2017','23')},

];

	return {customers,customer_groups,products,orders,updates};
}






}
