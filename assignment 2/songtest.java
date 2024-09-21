import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.HashMap;

import org.junit.*;
public class songtest {
    Song s1=new Song();

    @Test 
    public void displaytest(){

        s1.hm.put(1, createSampleSong("Naatu", "RRR", "folk", "Rahul", "2023", "Telugu"));
        s1.hm.put(2, createSampleSong("saalar", "saalar", "action", "mano", "2024", "Telugu"));

        assertEquals(2, s1.hm.size(), "Number of songs should be 2");

    }

    @Test
    public void testDisplayEmpty() {
        assertEquals(0, s1.hm.size(), "Number of songs should be 0");
    }

    @Test
    public void movietest(){
        s1.hm.put(1, createSampleSong("Hoyna", "Aata", "melody", "karthik", "2007", "Telugu"));
        s1.hm.put(2,createSampleSong("Evarevaro", "Animal", "Romantic", "Haricharan", "2023", "Telugu"));
        String mn="";
        for(int c:s1.hm.keySet()){           //songs for entered movie
            if(s1.hm.get(c).get("Movie Name").equals("Aata")){      //search for movie name
                 mn=s1.hm.get(c).get("Song Title");
              }
           }
        assertEquals("Hoyna",mn);
    }

    @Test
    public void singertest(){
        s1.hm.put(1, createSampleSong("Hoyna", "Aata", "melody", "karthik", "2007", "Telugu"));
        s1.hm.put(2,createSampleSong("Evarevaro", "Animal", "Romantic", "Haricharan", "2023", "Telugu"));
        String sn="";
        for(int c:s1.hm.keySet()){     // songs for entered singer
            if(s1.hm.get(c).get("Singer name").equals("karthik")){    //check for singer name in map
               sn=s1.hm.get(c).get("Song Title");
            }
         }
           assertEquals("Hoyna",sn);
    }
     
    @Test
    public void categorytest(){
        s1.hm.put(1, createSampleSong("Naatu", "RRR", "folk", "Rahul", "2023", "Telugu"));
        s1.hm.put(2, createSampleSong("saalar", "saalar", "action", "mano", "2024", "Telugu"));
        String ct="";
        for(int c:s1.hm.keySet()){   //songs under given category
            if(s1.hm.get(c).get("category").equals("action")){
               ct=s1.hm.get(c).get("Song Title");
            }
        }
           assertEquals("saalar",ct);
    }
    
    @Test
    public void yeartest(){
        s1.hm.put(1, createSampleSong("Naatu", "RRR", "folk", "Rahul", "2023", "Telugu"));
        s1.hm.put(2, createSampleSong("saalar", "saalar", "action", "mano", "2023", "Telugu"));
        
        
        long yearCount = s1.hm.values().stream()
        .filter(song -> "2023".equals(song.get("Year of release")))
        .count();

        assertEquals(2, yearCount, "There should be 2 song released in 2023");
    }

    @Test
   public void testPlay() {
        s1.hm.put(1, createSampleSong("Naatu", "RRR", "folk", "Rahul", "2023", "Telugu"));


        String playingSong = s1.hm.get(1).get("Song Title");
        assertEquals("Naatu", playingSong, "The song playing should be Naatu");
    }
     HashMap<String, String> createSampleSong(String title, String movie, String category, String singer, String year, String language) {
        HashMap<String, String> songDetails = new HashMap<>();
        songDetails.put("Song Title", title);
        songDetails.put("Movie Name", movie);
        songDetails.put("category", category);
        songDetails.put("Singer name", singer);
        songDetails.put("Year of release", year);
        songDetails.put("Language", language);
        return songDetails;
    }
}
