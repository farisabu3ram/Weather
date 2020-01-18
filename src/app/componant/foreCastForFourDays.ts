export class foreCastForFourDays {
     public day: string;
     public icon: string;
     public max_temp: number;
     public  min_temp: number;
     public fourDay:[]
   public  constructor(day, icon, max_temp, min_temp,fourDay) {
        this.day = day;
        this.icon = icon;
        this.max_temp = max_temp;
        this.min_temp = min_temp;
        this.fourDay=fourDay;
    }

}