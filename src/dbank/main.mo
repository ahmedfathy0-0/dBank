import Debug "mo:base/Debug";

actor {
  var currentValue =300;
  public func topUp(amount: Nat) {
    currentValue += amount;
    Debug.print(debug_show(currentValue));
  };
  public func withdraw(amount: Nat) {
    if (currentValue >= amount) {
      currentValue -= amount;
      Debug.print(debug_show(currentValue));
    } else {
      Debug.print("Insufficient funds");
    }
  };
 
}
