RecoveryBot
===========
RecoveryBot är en AI-baserad applikation som hjälper användare att optimera sin återhämtning efter träning. Genom att ta in enkla indata som energinivåer och fokus kan applikationen rekommendera stretch och/eller mat för optimal återhämtning.

Funktioner
----------
- Gör AI-baserade rekommendationer baserat på användarens energinivå och fysiska fokus.
- Visar både rekommendationer och rådata från modellen för transparens.
- Enkelt gränssnitt med HTML, CSS och JavaScript.
- Applikationen är byggd med Brain.js för träning och prediktion.

Installation och användning
---------------------------

Förutsättningar
---------------
För att använda applikationen behöver du:
- **Node.js** installerat på din dator.
Steg för steg:
--------------
1. **Klona projektet:**  
   Ladda ner eller klona projektet till din dator:  
   ```bash
   git clone https://github.com/ditt-användarnamn/recoverybot.git
   cd recoverybot

Installera beroenden:
--------------
npm install

Starta applikationen:
--------------
Öppna projektet genom att skriva in node server.js i din terminal som sedan kommer att starta upp på localhost:3000

Använd applikationen:
--------------
Välj dina övningar och energinivåer i formuläret.
- Klicka på "Beräkna återhämtning" för att se rekommendationerna.
- Om du vill se rådata från modellen, klicka på knappen "Visa rådata".
Konsol-loggning:
Om du vill granska AI-modellens förutsägelser och interna data:


Öppna webbläsarens utvecklarverktyg (oftast med F12 eller högerklick -> Inspektera).
Gå till fliken Konsol för att se loggarna.

Tekniska detaljer:
----------
- JavaScript-bibliotek: Brain.js används för att skapa och träna en enkel neuralt nätverk-modell.
- Inputs: Modellen tar binära indata för energi och fysisk fokus.
- Outputs: Rekommenderar stretch, mat, eller båda.
- Användargränssnitt: Applikationen är byggd med HTML och CSS för en ren och responsiv design.

Testning
----------
- Applikationen har testats med olika scenarier för att säkerställa att rekommendationerna är korrekta. Om du vill testa applikationen med egna dataset, ändra eller lägg till i träningsdatan i app.js.
