package com.jiakuang.assignment.tool.common;

import java.util.List;

public final class CommonConst {

    public static List<String> blockedSqlKeyWords(){
        return  List.of(
                " insert ",
                " update ",
                " delete ",
                " drop ",
                " alter ",
                " truncate ",
                " create ",
                " merge ",
                " grant ",
                " revoke "
        );
    }
}
