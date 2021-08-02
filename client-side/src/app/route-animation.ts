import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild,
} from "@angular/animations";

// animationPlayState: 'running'
export const slideInAnimation = trigger("routeAnimations", [
  transition("* => *", [
    query(
      ":enter, :leave",
      style({ position: "fixed", width: "100%", height: "100%" }),
      { optional: true }
    ),
    group([
      query(
        ":enter",
        [
          style({
            animation: "backgroundBorder 1s ease-in-out",
            animationPlayState: "running",
            opacity: "0",
          }),
          animate(
            "0.36s ease",
            style({
              animation: "backgroundBorder 1s ease-in-out",
              animationPlayState: "running",
              opacity: "1",
            })
          ),
        ],
        { optional: true }
      ),
      query(
        ":leave",
        [
          style({
            animation: "backgroundBorder 1s ease-in-out",
            animationPlayState: "running",
            opacity: "1",
          }),
          animate(
            "0.36s ease",
            style({
              animation: "backgroundBorder 1s ease-in-out",
              animationPlayState: "running",
              opacity: "0",
            })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
  //   transition('* => *', [
  //     query(':enter, :leave', style({ position: 'fixed', width: '100%',height:'100%' }), { optional: true }),
  //     group([
  //         query(':enter', [
  //             style({ transform: 'scale(0)' , opacity:'0'}),
  //             animate('0.5s ease-in-out', style({ transform: 'scale(1)' ,opacity:'1' }))
  //         ], { optional: true }),
  //         query(':leave', [
  //             style({ transform: 'scale(1)' ,opacity:'1' }),
  //             animate('0.5s ease-in-out', style({ transform:  'scale(0)', opacity:'0' }))
  //         ], { optional: true }),
  //     ])
  // ])

  // this one

  //         transition('Login => Lists', [
  //     query(':enter, :leave', style({ position: 'fixed', width: '100%',height:'100%' }), { optional: true }),
  //     group([
  //         query(':enter', [
  //             style({ opacity:'0'}),
  //             animate('0.5s ease-out', style({ opacity:'1' }))
  //         ], { optional: true }),
  //         query(':leave', [
  //             style({ transform: 'scale(1,1)'}),
  //             animate('0.5s ease-in-out', style({ transform: 'scale(2.85,2.41)' }))
  //         ], { optional: true }),
  //     ])
  // ])
  //   transition('Login => Lists', [
  //     query(':enter, :leave', style({ position: 'fixed', width: '100%',height:'100%' }), { optional: true }),
  //     group([
  //         query(':enter', [
  //             style({ width:'1000px',height:'720px'}),
  //             animate('0.5s ease-in-out', style({ width:'350px',height:'298px' }))
  //         ], { optional: true }),
  //         query(':leave', [
  //             style({ width:'350px',height:'298px' }),
  //             animate('0.5s ease-in-out', style({ width:'1000px',height:'720px' }))
  //         ], { optional: true }),
  //     ])
  // ])

  //   transition('* => *', [
  //     query(':enter, :leave', style({ position: 'fixed', width: '100%' ,height:'100%'}), { optional: true }),
  //     group([
  //         query(':enter', [
  //             style({ transform: 'translateX(100%)' }),
  //             animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
  //         ], { optional: true }),
  //         query(':leave', [
  //             style({ transform: 'translateX(0%)' }),
  //             animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
  //         ], { optional: true }),
  //     ])
  // ]),
]);
