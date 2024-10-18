import java.util.*;
public class MusicPlayer{  
    public static void main(String[] args) {
         Song s1=new Song();
         Scanner s=new Scanner(System.in);
         s1.enter();
         while(true){
             diplayMenu();
             int x=s.nextInt();
             if(x>=10) System.out.println("choose option less than 10");
             else{
             switch(x){   
                   case 1:s1.display();    break;
                   case 2:s1.moviename();  break;
                   case 3:s1.singername(); break;
                   case 4:s1.play();       break;
                   case 5:s1.category();   break;
                   case 6:s1.year();       break;
                   case 7:s1.songtitle();  break;
                   case 8:s1.playlist();   break;
                   case 9:s1.close();      break;
                   default:System.out.println("invalid choice"); 
            }
        }
       if(x==9) break;
    }
    s.close(); 
   }

   static void diplayMenu(){
      System.out.println();
      System.out.println("Please choose an option:");
      System.out.println("1: Display all songs");
      System.out.println("2: songs for specific Movie Name");
      System.out.println("3: songs for specific Singer Name");
      System.out.println("4: Play a song");
      System.out.println("5: songs by Category");
      System.out.println("6: songs by Year");
      System.out.println("7: view Song Details");
      System.out.println("8: Playlist");
      System.out.println("9: exit");
      System.out.println();
      System.out.print("Your choice: ");
   }
}
 class Song{
        String songtitle,moviename,cat,singername,lang,yor;
        HashMap<Integer,HashMap<String,String>> hm=new HashMap<>();
        Scanner s=new Scanner(System.in);

 
      public void enter(){ //entering the songs details
           System.out.println("Enter number of songs you want to insert into the music app:");
           int n=s.nextInt();
           System.out.println();
           int i=1;
           while(i<=n){
               HashMap<String,String> a=new HashMap<>();
               System.out.print("song title: ");
               songtitle=s.next();
               System.out.print("movie name: ");
               moviename=s.next();
               System.out.print("category: ");
               cat=s.next();
               System.out.print("singer name: ");
               singername=s.next();
               System.out.print("Year of Release: ");
               yor=s.next();
               
               System.out.print("language: ");
               lang=s.next();   
               a.put("Song Title",songtitle);  //inserting in to map
               a.put("Movie Name",moviename);
               a.put("category",cat);
               a.put("Singer name",singername);
               a.put("Year of release",yor);
               a.put("Language",lang);
               hm.put(i,a);
               i++;
               System.out.println();
                }
            }
         
       public void display(){
            System.out.println();
            if(hm.size()==0){              //if no elements found
                System.out.println("No songs found, add songs to display");
            }
            else {
                for(int c:hm.keySet()){
                    System.out.println("song "+c+" : "+hm.get(c));
                }
            }
        }

        void moviename(){
            System.out.println();
            System.out.print("movie name: ");
            String usermovie=s.next();
            int flag=0;
            System.out.print("song :");
            for(int c:hm.keySet()){           //songs for entered movie
            if(hm.get(c).get("Movie Name").equals(usermovie)){      //search for movie name
                System.out.println(hm.get(c).get("Song Title"));
                flag++;
              }
           }
           if(flag==0){
            System.out.println("movie not found");
           }
        }
         
        void singername(){
             System.out.println();
             System.out.print("singer name: ");
             String usersinger=s.next();
             int flag=0;
             System.out.print("song :");
             for(int c:hm.keySet()){     // songs for entered singer
                if(hm.get(c).get("Singer name").equals(usersinger)){    //check for singer name in map
                   System.out.println(hm.get(c).get("Song Title"));
                   flag++;
                }
             }
            if(flag==0){
               System.out.println("No song found with "+usersinger);
            }
        }
         
        void play(){
             System.out.println();
             System.out.print("song Id: ");
             int usersid=s.nextInt();
             if(hm.containsKey(usersid)){    //id is present then play the song
                 System.out.println(hm.get(usersid).get("Song Title")+" is playing");
              }
             else{
                  System.out.println("song with given id not found");
              }
        }

        void category() {
            System.out.println();
            System.out.println("the categories are: ");
            for(int c:hm.keySet()){    //printing all categories
                    System.out.println(hm.get(c).get("category"));
                }
                System.out.print("category: ");
                String usercat=s.next();
                System.out.print("song :"); 
                int flag=0;
                for(int c:hm.keySet()){   //songs under given category
                    if(hm.get(c).get("category").equals(usercat)){
                        System.out.println(hm.get(c).get("Song Title"));
                        flag++;
                    }
                }
                if(flag==0){
                    System.out.println("No song found with "+usercat);
                 }
        }


        void year(){
                System.out.println();
                System.out.print("year of release: ");
                String useryear=s.next();
                int flag=0;
                System.out.print("song :");
                for(int c:hm.keySet()){     //songs released in given year 
                    if(hm.get(c).get("Year of release").equals(useryear)){ //search for year
                        System.out.println(hm.get(c).get("Song Title"));
                        flag++;
                    }
                }
                if(flag==0){
                    System.out.println("No song found with "+useryear);
                }
        }

        void songtitle(){
            System.out.println();
            System.out.print("song title: ");
            String userst=s.next();
            System.out.print("details of song: ");
            int flag=0;
            for(int c:hm.keySet()){     //search for given song title
               if(hm.get(c).get("Song Title").equals(userst)){
                System.out.println(hm.get(c));
                flag++;
              }
            }
            if(flag==0){
                System.out.println("No song found with "+userst);
            }
        }

        void playlist(){
             System.out.println();
             System.out.println("id and songtitle: ");
             for(int c:hm.keySet()){   //print all songs in playlist
                 System.out.println(c+"  "+hm.get(c).get("Song Title"));
             }
             System.out.print("number of songs: ");
             int un=s.nextInt();
             HashMap<Integer,HashMap<String,String>> hm1=new HashMap<>();
             System.out.print("enter Id : ");
             while(un-->0){
                  int uid=s.nextInt();
                 if(hm.containsKey(uid)){
                    hm1.put(uid,hm.get(uid)); //user entered songs
                 }
             }
             for(int c:hm1.keySet()){
                System.out.println("song "+c+" : "+hm1.get(c));
             }
        }

        void close(){
              System.out.println();
              System.out.println("program terminated");
              s.close();
        }
}
