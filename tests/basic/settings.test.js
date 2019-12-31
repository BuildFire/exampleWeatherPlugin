class SettingsTest {
    /**
     * Total number of tests
     */
    static get testCount() {
      return 4;
    }
  
    /**
     * Handle finishing of each test and restore data if it is the last one
     */
    static finishTest() {
      if (!this.finishedTests) this.finishedTests = 0;
      this.finishedTests++;
      if (this.finishedTests === SettingsTest.testCount) {
        Settings.set(new Setting(this.initial), () => {});
        this.finishedTests = undefined;
      }
    }
    initial = {};
    
    static run = () => {
      
      test("Get settings data", () => {
        Settings.get((err, data) => {
          this.initial = data.place;
          console.log(data);

          if (err) {
            console.error(err);
            logError("Could not get settings data");
            SettingsTest.finishTest();
            return;
          } else {
            expect("Got settings data successfully", data);
            SettingsTest.finishTest();
          }
  
          test("Add location", () => {
            const testItem = {
              title: "Test 1",
              address: {
                lat: 32,
                lng: 34
              }
            };
            
            Settings.add(testItem, (e, addData) => {
              if (e) {
                logError("Could not add location");
                SettingsTest.finishTest();
                return;
              } else {
                expect("Added location successfully", testItem);
                SettingsTest.finishTest();
              }
                
                test("Update settings", () => {
                  const testItem = {
                    title: "Test 1",
                    address: {
                      lat: 32,
                      lng: 34
                    }
                  };
                  Settings.set(testItem, (err, updateData) => {
                    if (err) {
                      console.error(err);
                      logError("Could not update settings");
                      SettingsTest.finishTest();
                      return;
                    } else {
                      expect("Updated settings data successfully", updateData);
                      SettingsTest.finishTest();
                    }
                  });
                });
              });
          });
        });
      });
    }
  }