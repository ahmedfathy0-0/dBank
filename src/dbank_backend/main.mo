import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";


actor {
   stable var currentValue : Float = 300;
  public func topUp(amount: Float) {
    currentValue += amount;
    Debug.print(debug_show(currentValue));
  };
  public func withdraw(amount: Float) {
    if (currentValue >= amount) {
      currentValue -= amount;
      Debug.print(debug_show(currentValue));
    } else {
      Debug.print("Insufficient funds");
    }
  };
  public query func checkBalance(): async Float {
    return currentValue;
  };

    stable var startTime = Time.now();

 
    public func compuound() {
    let currentTime = Time.now();
    let timeNS = currentTime - startTime;
    let timeS = timeNS / 1000000000;
    currentValue := currentValue * (1.01 ** Float.fromInt(timeS));
    startTime := currentTime;
    }


}
