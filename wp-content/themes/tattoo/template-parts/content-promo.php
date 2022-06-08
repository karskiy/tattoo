<div id="promo" class="site-promo pb-0 pb-lg-5 mb-5">
    <div class="container-fluid container-md">
        <?php if (have_rows('t_block')): ?>
            <div class="row">
                <?php while (have_rows('t_block')): the_row();
                    $image = get_sub_field('img');
                    $text = get_sub_field('txt');
                    ?>
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="row">
                            <div class="col-5 col-sm-auto d-flex align-items-center">
                                <img src="<?php echo $image; ?>" alt="Картинка">
                            </div>
                            <div class="col-7 col-sm d-flex align-items-center">
                                <?php echo $text; ?>
                            </div>
                        </div>
                    </div>
                <?php endwhile; ?>
            </div
        <?php endif; ?>
    </div>
</div>
</div><!-- #promo -->