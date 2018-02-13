$(document).ready(function() {
  var player = [];
  var opponent = [];
  var population = [];
  var graveyard = [];
  var active = 0;
  var atk = 0;
  var cAtk = 0;
  var playerHp = 0;
  var opponentHp = 0;
  var multiplier = 0;
  var alive = true;
  var luke = {
    name: "luke skywalker",
    pid: 1,
    ap: 7,
    cap: 5,
    hp: 100
  };
  var obi = {
    name: "obiwan kenobi",
    pid: 2,
    ap: 6,
    cap: 10,
    hp: 100
  };
  var maul = {
    name: "darth maul",
    pid: 3,
    ap: 5,
    cap: 13,
    hp: 100
  };
  var vader = {
    name: "darth vader",
    pid: 4,
    ap: 4,
    cap: 18,
    hp: 100
  };
  population = [luke, obi, maul, vader];
  var kills = population.length-1;
  //   $(".img-thumbnail").on("click", function() {
  //     if (active == 0) {
  //       console.log(this.longdesc);
  //       console.log(population[this.value]);
  //       player.push(population[this.value]);
  //       active = 1;
  //       $(this).appendTo($("#player"));
  //       console.log(player);
  //       console.log(playerHp);
  //       return;
  //     }
  //     if (active == 1) {
  //       opponent.push(population[this.value]);
  //       active = 2;
  //       $(this).appendTo($("#opponent"));
  //       return;
  //     }
  //   });

  $(".number").on("click", function() {
    if (active == 0) {
      console.log(this.value);
      console.log(population[this.value]);
      player.push(population[this.value]);
      active = 1;
      $(this).appendTo($("#player"));
      playerHp = player[0].hp;
      atk = player[0].ap;
      multiplier = atk;
      var div = $("<div></div>");
      div.text(playerHp);
      div.addClass("text-center");
      div.attr("id", "plHp");
      $("#player").append(div);
      return;
    }
    if (active == 1 && alive) {
      opponent.push(population[this.value]);
      active = 2;
      $(this).appendTo($("#opponent"));
      $(this).attr("id", "currentOp");
      cAtk = opponent[0].cap;
      opponentHp = opponent[0].hp;
      var div = $("<div></div>");
      div.text(opponentHp);
      div.addClass("text-center");
      div.attr("id", "opHp");
      $("#opponent").append(div);
      return;
    }
  });

  $("#attack").on("click", function() {
    if (active == 2 && alive) {
      opponentHp -= atk;
      $("#cm1").text(
        player[0].name + " did " + atk + " dmg to " + opponent[0].name
      );
      if (active == 2) {
        $("#cm2").text("You defeated your current enemy! pick another guy!");
      }
      atk += multiplier;
      $("#opHp").text(opponentHp);

      if (opponentHp <= 0) {
        active = 1;
        $("#currentOp").remove();
        $("#opHp").remove();
        opponent = [];
        kills--;
        if (kills == 0) {
          active = 3;
          $("#cm2").text("You defeated everyone! You are the champion!");
          setTimeout(_ => {
            location.reload(true);
          }, 4000);
        }
        return;
      }
      playerHp -= cAtk;
      $("#cm2").text(
        opponent[0].name + " did " + cAtk + " dmg to " + player[0].name
      );
      $("#plHp").text(playerHp);

      if (playerHp <= 0) {
        $("#cm2").text(
          opponent[0].name +
            " did " +
            cAtk +
            " dmg to " +
            player[0].name +
            ", you died!"
        );
        alive = false;
        setTimeout(_ => {
          document.write("GAME OVER");
        }, 2000);
        setTimeout(_ => {
          location.reload(true);
        }, 3500);
      }
    }
  });
});
