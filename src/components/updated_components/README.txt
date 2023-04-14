29.03.2023                  Update: Menu as component
                            Menu added to App.js as parent component, because of linked props between parent/child
                            not possible to pass props between two child components (Problem: currentPage defined in child component
                            has to interact with nameTag State - props from child can't be read in parent App.js and used furthermore todi
                            display nameTag in child component Appbar)

                            To Do:
                            > Star-Menu Button linked to Footer
                            > User Menu AND Login Formular
                            > onMapClick to show data as Popup Window

03.04.2023                  To Do:
                            > Menu Interface Zusammenfassung von Daten (gut möglich oder nicht im jeweiligen Gewässer)
                            > Geographische Auswahl der Seen als Objekte mit Label anstatt Buttons
                            > Format Smartphone/Web
                            > User Ausrichtung ZENTRAL
                            Coaching GUI

14.04.2023                  > Logout? Implementierung (Seiten Refresh?)
                            >‌ Keine Cookies/Tokens um Login Daten zu speichern + Login Security
                            >‌ Bugs in Rendering
                            > ‌Additional User Settings (Bild, Tel. Nr - Security, etc.)
                            >‌ Backend GeoServer Daten Darstellung
                            >‌ Gesamt Frame (@Tailwindcss)
                            
                            -> Login without storing Login-Data will result in Refresh-Logout

 
Verwendungszweck: Planung
Nutzerpfade GUI überlegen
In welcher Reihenfolge anschauen?  Web App nach Ablauf aufbauen
Nutzerperson: welche Bedürfnisse? Guter Segler? Mobil in der ganzen Schweiz? Welche Darstellungen sind optimal für den Benutzer?
Welche Daten brauchen wir?
Auf welcher Plattform (Browser/Smartphone) anbieten?  spezifisches Design dafür
 
Konkret:
Wind als erstes sehen
 
Ideen:
Schon als erstes mit Ampelsystem sehen, welche Seen überhaupt zum segeln in Frage kommen