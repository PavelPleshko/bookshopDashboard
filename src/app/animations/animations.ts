import { trigger, state, query,animate,keyframes, transition, style,group,animateChild,stagger } from '@angular/animations';
   
export const slideInOutAnimation =
    trigger('slideInOutAnimation', [
        transition(':enter', [
            style({
                top: '-200%',
                opacity:0
            }),
            animate('.5s ease-in-out', style({
                top: 0,
                opacity:1
            }))
        ]),
        transition(':leave', [
            animate('.5s ease-in-out', style({
                top: '-200%',
                opacity:0
            }))
        ])
    ]);


    export const routeAnimation = 
   trigger('routeAnimation', [
    state('void', style({position:'relative'}) ),
    state('*', style({position:'relative'}) ),
    transition(':enter', [
      style({left: '100%',opacity:0}),
      animate('0.5s ease-in-out', style({left: '0%',opacity:1}))
    ]),
    transition(':leave', [ 
      style({left: '0%',opacity:1}),
      animate('0.5s ease-in-out', style({left: '-100%',opacity:0}))
    ])
]);


    export const dropFromTop = 
   trigger('dropFromTop', [
    state('void', style({position:'fixed'}) ),
    state('*', style({position:'fixed'}) ),
    transition(':enter', [
      style({bottom: '100%'}),
      animate('0.5s ease-in-out', style({bottom: '0%'}))
    ])
]);

   export const listItemAnimation = 
   trigger('listItemAnimation', [
    transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('.5s cubic-bezier(.8,-0.6,0.2,1.5)', 
          style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1}),
        animate('1s cubic-bezier(.8,-0.6,0.2,1.5)', 
          style({ transform: 'scale(0.5)', opacity: 0}))
      ])
]);

   export const list =  trigger('list', [
      transition(':enter', [
        query('@listItemAnimation', 
          stagger(300, animateChild())
        )
      ]),
    ])